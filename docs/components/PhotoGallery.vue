<script setup>
import { ref } from 'vue'

const props = defineProps({
  photosPath: {
    type: String,
    required: true
  }
})

// get json file from photosPath
const photosData = ref([])
const fetchPhotos = async () => {
  try {
    const response = await fetch(`${props.photosPath}/photo_metadata.json`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    photosData.value = await response.json()
  } catch (error) {
    console.error('Error fetching photos:', error)
  }
}
fetchPhotos()

const selectedPhoto = ref(null)

const openLightbox = (photo) => {
  selectedPhoto.value = photo
  document.documentElement.style.overflow = 'hidden' // 禁用背景滚动
}

const closeLightbox = () => {
  selectedPhoto.value = null
  document.documentElement.style.overflow = ''
}
</script>

<template>
  <div class="gallery-grid">
    <div
        v-for="(photo, index) in photosData"
        :key="index"
        class="gallery-item"
        @click="openLightbox(photo)"
    >
      <img
          :src="`${props.photosPath}/${photo.file}`"
          :alt="photo.title"
          loading="lazy"
          class="thumbnail"
      >
      <div class="meta-overlay">
        <h3>{{ photo.title }}</h3>
        <p>{{ photo.location }}</p>
      </div>
    </div>

    <!-- 灯箱模态框 -->
    <div v-if="selectedPhoto" class="lightbox" @click.self="closeLightbox">
      <div class="lightbox-content">
        <div class="image-container">
          <img
              :src="`${photosPath}/${selectedPhoto.file}`"
              :alt="selectedPhoto.title"
              class="enlarged"
          >
        </div>
        <div class="photo-meta">
          <h2>{{ selectedPhoto.title }}</h2>
          <p>{{ selectedPhoto.description }}</p>
          <dl>
            <dt>Time</dt>
            <dd>{{ selectedPhoto.exif.timestamp }}</dd>
            <dt>Camera Model</dt>
            <dd>{{ selectedPhoto.exif.camera }}</dd>
            <dt>Aperture</dt>
            <dd>ƒ/{{ selectedPhoto.exif.aperture }}</dd>
            <dt>Shutter Speed</dt>
            <dd>{{ selectedPhoto.exif.shutter }}</dd>
            <dt>ISO</dt>
            <dd>{{ selectedPhoto.exif.iso }}</dd>
            <dt>Focal Length</dt>
            <dd>{{ selectedPhoto.exif.focal_length }}</dd>
            <dt>Lens Model</dt>
            <dd>{{ selectedPhoto.exif.lens }}</dd>
          </dl>
        </div>
        <button class="close-btn" @click="closeLightbox">×</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1920px;
  margin: 0 auto;
}

.gallery-item {
  position: relative;
  cursor: zoom-in;
  overflow: hidden;
  border-radius: 12px;
  aspect-ratio: 4/3;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover .thumbnail {
  transform: scale(1.08);
}

.meta-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.gallery-item:hover .meta-overlay {
  transform: translateY(0);
}

.meta-overlay h3 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.meta-overlay p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #1c1e21;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  padding: 2rem;
}

.lightbox-content {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(300px, 0.5fr);
  gap: 2rem;
  max-width: 1600px;
  width: 100%;
  height: 90vh;
  position: relative;
}

.image-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.enlarged {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

.photo-meta {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  padding: 2rem;
  border-radius: 12px;
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.photo-meta h2 {
  margin: 0;
  font-size: 1.75rem;
  color: floralwhite;
  border-top: none;
}

.photo-meta p {
  color: wheat;
  line-height: 1.6;
  margin: 0;
}

.photo-meta dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  margin: 0;
}

.photo-meta dt {
  color: white;
  font-weight: 500;
}

.photo-meta dd {
  margin: 0;
  color: antiquewhite;
  font-weight: 600;
}

.close-btn {
  position: absolute;
  top: -2rem;
  right: -2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s ease;
  z-index: 1000;
}

.close-btn:hover {
  transform: rotate(90deg);
}

@media (max-width: 1024px) {
  .lightbox {
    padding: 1rem;
  }

  .lightbox-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(0, 1fr);
    height: auto;
    max-height: 90vh;
  }

  .image-container {
    height: auto;
  }

  .enlarged {
    max-height: 60vh;
  }

  .photo-meta {
    max-height: 40vh;
  }

  .close-btn {
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
  }
}
</style>