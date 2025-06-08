# Changelog System Documentation

This changelog system is designed for static deployment on platforms like GitHub Pages. All changelog files are stored in the `public/changelogs/` directory to ensure they're accessible at runtime.

## 📁 File Structure

```
docs/
├── public/
│   ├── changelogs/              # Changelog markdown files
│   │   ├── 2025-06-08.md
│   │   ├── 2024-12-15.md
│   │   ├── 2024-11-20.md
│   │   └── 2024-10-10.md
│   └── changelogs-manifest.json # Auto-generated file list
├── components/
│   └── ChangeLog.vue            # Vue component
└── .vitepress/
    └── scripts/
        └── generate-changelog-manifest.js  # Manifest generator
```

## 🚀 Usage

### Adding New Changelogs

1. **Create a new markdown file** in `docs/public/changelogs/` with the format `YYYY-MM-DD.md`
2. **Follow this structure**:
   ```markdown
   # Your Title - Month DD, YYYY
   
   ## 🚀 Major Updates
   - Feature 1
   - Feature 2
   
   ## ✨ New Features
   - Feature A
   - Feature B
   
   ## 🐛 Bug Fixes
   - Fix 1
   - Fix 2
   ```

3. **Regenerate the manifest**:
   ```bash
   npm run changelog:manifest
   ```

### Building for Production

The build process automatically generates the manifest:

```bash
npm run docs:build
```

This runs:
1. `npm run changelog:manifest` - Generates the manifest
2. `vitepress build docs` - Builds the site

## 🎨 Component Features

### Date Filtering
- Calendar date picker for filtering changelogs
- Shows only changelogs from selected date
- Easy clear functionality

### Performance
- Lazy loading with pagination (5 items per page)
- Smooth animations and transitions
- Responsive design for all devices

### Export Options
- Export as JSON
- Export as Markdown
- Floating export button

### Keyboard Navigation
- `ESC` - Clear date filter or close export menu
- `/` - Focus on date input

## 🔧 Configuration

The ChangeLog component accepts these props:

```vue
<ChangeLog 
  :changelog-files="['2024-01-01.md']"  // Optional: manual file list
  base-url="/changelogs/"               // Base URL for fetching files
  :use-manifest="true"                  // Use manifest.json (recommended)
/>
```

## 📝 Manifest Structure

The auto-generated `changelogs-manifest.json` contains:

```json
{
  "generated": "2025-06-08T06:01:08.217Z",
  "totalCount": 4,
  "files": ["2025-06-08.md", "2024-12-15.md"],
  "metadata": [
    {
      "filename": "2025-06-08.md",
      "date": "2025-06-08", 
      "title": "ChangeLog Component Migration - June 8, 2025",
      "lastModified": "2025-06-08T05:47:05.864Z",
      "size": 1234
    }
  ]
}
```

## 🌐 Static Deployment

This system is optimized for static hosting:

- ✅ **GitHub Pages** - Works out of the box
- ✅ **Netlify** - No server-side requirements
- ✅ **Vercel** - Static file serving
- ✅ **Any CDN** - All files are public

## 🛠️ Development

### Local Development
```bash
npm run docs:dev
```

### Adding to CI/CD
Make sure your deployment pipeline runs:
```bash
npm run docs:build
```

This ensures the manifest is always up-to-date in production.

## 🎯 Best Practices

1. **Consistent naming**: Use `YYYY-MM-DD.md` format
2. **Clear titles**: Include descriptive titles with dates
3. **Organized content**: Use consistent emoji and section headers
4. **Regular updates**: Update the manifest after adding files
5. **Version control**: Commit both changelog files and updated manifest

## 🔍 Troubleshooting

### Files not loading?
- Check that files are in `docs/public/changelogs/`
- Verify the manifest is up-to-date
- Ensure file names match the manifest

### Date filtering not working?
- Verify the filename follows `YYYY-MM-DD.md` format
- Check that dates are valid

### Manifest out of sync?
```bash
npm run changelog:manifest
```
