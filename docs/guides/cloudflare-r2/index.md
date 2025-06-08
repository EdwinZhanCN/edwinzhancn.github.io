# Cloudflare R2 for Media Management

## Overview

Cloudflare R2 is an S3-compatible object storage service that offers zero egress fees, making it an excellent choice for hosting static media assets like images, videos, and other files for your VitePress website. This guide will show you how to set up and integrate Cloudflare R2 with your static site.

## Why Use Cloudflare R2?

- **Zero egress fees**: Unlike other cloud storage providers, R2 doesn't charge for data transfer out
- **S3 compatibility**: Works with existing S3 tools and libraries
- **Global CDN**: Automatic caching through Cloudflare's global network
- **Cost-effective**: Competitive pricing for storage
- **High performance**: Fast content delivery worldwide

## Setting Up Cloudflare R2

### Step 1: Create a Cloudflare Account

1. Visit [Cloudflare](https://cloudflare.com) and create an account
2. Navigate to the R2 Object Storage section in your dashboard
3. Enable R2 Object Storage (you may need to add a payment method)

### Step 2: Create an R2 Bucket

1. Click "Create bucket"
2. Choose a unique bucket name (e.g., `my-website-media`)
3. Select a location hint (closest to your users)
4. Click "Create bucket"

### Step 3: Configure Bucket Settings

#### Public Access Configuration

For a static website, you'll want to make your media files publicly accessible:

1. Go to your bucket settings
2. Navigate to "Settings" tab
3. Under "Public access", click "Allow Access"
4. Configure custom domain (optional but recommended)

#### Custom Domain Setup (Recommended)

1. In your bucket settings, go to "Settings"
2. Click "Connect Domain"
3. Enter your custom domain (e.g., `media.yourdomain.com`)
4. Add the required DNS records to your domain:
   ```
   Type: CNAME
   Name: media
   Target: <your-bucket-name>.r2.cloudflarestorage.com
   ```

## Organizing Your Media Files

### Recommended Folder Structure

```
your-bucket/
├── images/
│   ├── blog/
│   │   ├── 2024/
│   │   └── thumbnails/
│   ├── gallery/
│   │   ├── nikon-d100/
│   │   └── nikon-zfc/
│   └── ui/
│       ├── icons/
│       └── logos/
├── videos/
│   ├── tutorials/
│   └── demos/
├── documents/
│   └── pdfs/
└── assets/
    ├── fonts/
    └── styles/
```

### File Naming Conventions

- Use lowercase letters and hyphens
- Include dates for blog content: `2024-01-15-tutorial-screenshot.jpg`
- Use descriptive names: `jetson-yolo-demo-video.mp4`
- Consider file sizes and optimize before uploading

## Uploading Files to R2

### Method 1: Web Interface

1. Open your R2 bucket in the Cloudflare dashboard
2. Click "Upload" button
3. Drag and drop files or browse to select them
4. Files will be uploaded and immediately available

### Method 2: CLI Tools

#### Using Rclone (Recommended)

1. Install Rclone:
   ```bash
   # On macOS
   brew install rclone
   
   # On Ubuntu/Debian
   sudo apt install rclone
   
   # On Windows
   # Download from https://rclone.org/downloads/
   ```

2. Configure Rclone for R2:
   ```bash
   rclone config
   ```
   
   Follow the prompts:
   - Choose "Amazon S3 Compliant Storage Providers"
   - Provider: "Cloudflare R2"
   - Enter your R2 credentials (from Cloudflare dashboard > R2 > Manage R2 API tokens)

3. Upload files:
   ```bash
   # Upload a single file
   rclone copy local-file.jpg r2:your-bucket-name/images/
   
   # Upload entire directory
   rclone sync ./local-media-folder r2:your-bucket-name/
   
   # Upload with progress
   rclone copy ./images r2:your-bucket-name/images/ --progress
   ```

#### Using AWS CLI

1. Install AWS CLI
2. Configure with R2 credentials:
   ```bash
   aws configure
   # Use your R2 access keys
   # Set region to "auto"
   # Set endpoint: https://<account-id>.r2.cloudflarestorage.com
   ```

3. Upload files:
   ```bash
   aws s3 cp image.jpg s3://your-bucket-name/images/ --endpoint-url https://<account-id>.r2.cloudflarestorage.com
   ```

## Integrating R2 with VitePress

### Method 1: Direct URLs in Markdown

```markdown
<!-- Using custom domain -->
![Alt text](https://media.yourdomain.com/images/screenshot.jpg)

<!-- Using R2 direct URL -->
![Alt text](https://your-bucket.r2.dev/images/screenshot.jpg)

<!-- Video embed -->
<video controls>
  <source src="https://media.yourdomain.com/videos/demo.mp4" type="video/mp4">
</video>
```

### Method 2: Create a Media Helper

Create a composable for managing media URLs:

```typescript
// .vitepress/composables/useMedia.ts
export const useMedia = () => {
  const MEDIA_BASE_URL = 'https://media.yourdomain.com'
  
  const getImageUrl = (path: string) => `${MEDIA_BASE_URL}/images/${path}`
  const getVideoUrl = (path: string) => `${MEDIA_BASE_URL}/videos/${path}`
  const getDocumentUrl = (path: string) => `${MEDIA_BASE_URL}/documents/${path}`
  
  return {
    getImageUrl,
    getVideoUrl,
    getDocumentUrl
  }
}
```

Use in your Vue components:

```vue
<template>
  <img :src="getImageUrl('blog/2024/tutorial-screenshot.jpg')" alt="Tutorial Screenshot">
</template>

<script setup>
import { useMedia } from '../.vitepress/composables/useMedia'

const { getImageUrl } = useMedia()
</script>
```

### Method 3: Environment-Based Configuration

```typescript
// .vitepress/config.mts
export default defineConfig({
  define: {
    __MEDIA_BASE_URL__: JSON.stringify(
      process.env.NODE_ENV === 'production' 
        ? 'https://media.yourdomain.com'
        : '/local-media'
    )
  },
  // ... rest of config
})
```

## Optimization Best Practices

### Image Optimization

1. **Use WebP format** for better compression:
   ```bash
   # Convert images to WebP
   cwebp input.jpg -q 80 -o output.webp
   ```

2. **Create multiple sizes** for responsive images:
   ```markdown
   <picture>
     <source srcset="https://media.yourdomain.com/images/photo-800w.webp" media="(max-width: 800px)">
     <source srcset="https://media.yourdomain.com/images/photo-1200w.webp" media="(max-width: 1200px)">
     <img src="https://media.yourdomain.com/images/photo-1600w.webp" alt="Description">
   </picture>
   ```

### Video Optimization

1. **Use appropriate codecs**:
   - H.264 for broad compatibility
   - H.265/HEVC for better compression
   - VP9/AV1 for modern browsers

2. **Create multiple qualities**:
   ```bash
   # Using FFmpeg
   ffmpeg -i input.mp4 -b:v 1M -maxrate 1M -bufsize 2M output-1080p.mp4
   ffmpeg -i input.mp4 -b:v 500k -maxrate 500k -bufsize 1M output-720p.mp4
   ```

### Caching Configuration

Configure appropriate cache headers in Cloudflare:

1. Go to your domain in Cloudflare dashboard
2. Navigate to "Caching" > "Cache Rules"
3. Create a rule for your media subdomain:
   - **If**: Hostname equals `media.yourdomain.com`
   - **Then**: Cache Level = Standard, Browser TTL = 1 month, Edge TTL = 1 month

## Automation Scripts

### Bulk Upload Script

```bash
#!/bin/bash
# upload-media.sh

BUCKET_NAME="your-bucket-name"
LOCAL_DIR="./media"
R2_PREFIX="r2:$BUCKET_NAME"

echo "Starting upload to R2..."

# Upload images
rclone sync "$LOCAL_DIR/images" "$R2_PREFIX/images/" \
  --progress \
  --exclude "*.DS_Store" \
  --exclude "Thumbs.db"

# Upload videos
rclone sync "$LOCAL_DIR/videos" "$R2_PREFIX/videos/" \
  --progress \
  --exclude "*.DS_Store"

echo "Upload completed!"
```

### Image Processing Pipeline

```bash
#!/bin/bash
# process-images.sh

INPUT_DIR="./raw-images"
OUTPUT_DIR="./processed-images"
BUCKET_NAME="your-bucket-name"

mkdir -p "$OUTPUT_DIR"

for img in "$INPUT_DIR"/*.{jpg,jpeg,png}; do
  if [ -f "$img" ]; then
    filename=$(basename "$img")
    name="${filename%.*}"
    
    # Create WebP version
    cwebp "$img" -q 85 -o "$OUTPUT_DIR/${name}.webp"
    
    # Create thumbnail
    convert "$img" -resize 300x300> "$OUTPUT_DIR/${name}-thumb.webp"
    
    echo "Processed: $filename"
  fi
done

# Upload processed images
rclone sync "$OUTPUT_DIR" "r2:$BUCKET_NAME/images/processed/" --progress

echo "Processing and upload completed!"
```

## Cost Management

### Monitoring Usage

1. Check your R2 usage in Cloudflare dashboard
2. Set up billing alerts
3. Monitor bandwidth usage (though egress is free)

### Cost Optimization Tips

- Regularly clean up unused files
- Use appropriate storage classes
- Implement lifecycle policies for temporary files
- Compress files before uploading

## Security Considerations

### Access Control

1. **Use signed URLs** for sensitive content:
   ```javascript
   const signedUrl = await generateSignedUrl(bucketName, objectKey, expireTime)
   ```

2. **Implement proper CORS** settings:
   ```json
   {
     "AllowedOrigins": ["https://yourdomain.com"],
     "AllowedMethods": ["GET"],
     "AllowedHeaders": ["*"],
     "MaxAgeSeconds": 3000
   }
   ```

### Content Protection

- Use Cloudflare's security features
- Implement hotlink protection
- Consider watermarking for valuable images

## Troubleshooting

### Common Issues

1. **Files not loading**:
   - Check bucket permissions
   - Verify CORS settings
   - Ensure correct URLs

2. **Slow loading**:
   - Enable Cloudflare caching
   - Optimize file sizes
   - Use appropriate formats

3. **Upload failures**:
   - Check API token permissions
   - Verify bucket exists
   - Check file size limits

### Debug Commands

```bash
# Test connectivity
rclone ls r2:your-bucket-name

# Check file permissions
curl -I https://your-bucket.r2.dev/test-file.jpg

# Validate configuration
rclone config show
```

## Migration from Other Services

### From AWS S3

```bash
# Direct sync between services
rclone sync s3:old-bucket r2:new-bucket --progress
```

### From GitHub/Local Storage

```bash
# Migrate existing assets
find ./docs/public -name "*.jpg" -o -name "*.png" -o -name "*.mp4" | \
  xargs -I {} rclone copy {} r2:your-bucket/migrated/
```

## Conclusion

Cloudflare R2 provides an excellent solution for hosting media files for your VitePress site. With zero egress fees and global CDN integration, it's both cost-effective and performant. The S3 compatibility makes it easy to integrate with existing tools and workflows.

Key benefits:
- ✅ Zero bandwidth costs
- ✅ Global CDN included
- ✅ S3-compatible tools
- ✅ Easy integration with VitePress
- ✅ Scalable and reliable

Start small with a few images and gradually migrate your entire media library as you become more comfortable with the service.