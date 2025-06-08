<template>
  <div class="changelog-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-skeleton">
      <div class="skeleton-item" v-for="i in 3" :key="i">
        <div class="skeleton-header"></div>
        <div class="skeleton-content"></div>
        <div class="skeleton-content short"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-message">
      <div class="error-icon">⚠️</div>
      <h3>Failed to load changelogs</h3>
      <p>{{ error }}</p>
      <button @click="fetchChangelogs" class="retry-btn">
        Try Again
      </button>
    </div>

    <!-- Success State -->
    <div v-else class="changelog-content">
      <div class="changelog-header">
        <h1 class="changelog-title">📋 Changelog</h1>
        <p class="changelog-subtitle">
          Track all the changes, improvements, and bug fixes
        </p>
        <div class="stats">
          <span class="stat-item">
            <span class="stat-number">{{ allChangelogs.length }}</span>
            <span class="stat-label">Releases</span>
          </span>
          <span v-if="selectedDate" class="stat-item">
            <span class="stat-number">{{ filteredChangelogs.length }}</span>
            <span class="stat-label">Found</span>
          </span>
        </div>
        
        <!-- Date Filter -->
        <div class="date-filter-container">
          <div class="date-filter-box">
            <svg class="calendar-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
            <input
              v-model="selectedDate"
              type="date"
              class="date-input"
              :max="new Date().toISOString().split('T')[0]"
            />
            <button
              v-if="selectedDate"
              @click="selectedDate = ''"
              class="clear-date"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- No Results State -->
      <div v-if="!loading && !error && selectedDate && filteredChangelogs.length === 0" class="no-results">
        <div class="no-results-icon">📅</div>
        <h3>No changelogs found</h3>
        <p>No changelogs found for the selected date: <strong>{{ formatDate(selectedDate) }}</strong></p>
        <button @click="selectedDate = ''" class="clear-date-btn">
          Clear Date Filter
        </button>
      </div>



      <!-- Timeline -->
      <div v-if="!selectedDate || filteredChangelogs.length > 0" class="timeline">
        <div 
          v-for="(changelog, index) in visibleChangelogs" 
          :key="changelog.filename"
          class="timeline-item"
          :ref="el => { if (el) changelogRefs[index] = el }"
        >
          <div class="timeline-marker">
            <div class="timeline-dot"></div>
            <div v-if="index < visibleChangelogs.length - 1" class="timeline-line"></div>
          </div>
          
          <div class="changelog-card">
            <div class="card-header">
              <div class="date-badge">
                {{ formatDate(changelog.date) }}
              </div>
              <h2 class="changelog-title">{{ changelog.title }}</h2>
            </div>
            
            <div class="card-content" v-html="changelog.content"></div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMore" class="load-more-container">
        <button 
          @click="loadMore" 
          :disabled="loadingMore"
          class="load-more-btn"
        >
          <span v-if="loadingMore" class="loading-spinner"></span>
          {{ loadingMore ? 'Loading...' : 'Load More' }}
        </button>
      </div>

      <!-- Export Menu -->
      <div v-if="showExportMenu" class="export-menu">
        <div class="export-options">
          <button @click="exportChangelogs('json')" class="export-btn">
            Export as JSON
          </button>
          <button @click="exportChangelogs('markdown')" class="export-btn">
            Export as Markdown
          </button>
        </div>
        <button @click="showExportMenu = false" class="close-export">
          ✕
        </button>
      </div>

      <!-- Export Button -->
      <div class="export-container">
        <button @click="showExportMenu = true" class="export-trigger">
          📥 Export Changelogs
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, computed, onUnmounted } from 'vue'

// Reactive state
const changelogs = ref([])
const visibleChangelogs = ref([])
const loading = ref(true)
const loadingMore = ref(false)
const error = ref(null)
const changelogRefs = ref([])

// Pagination
const itemsPerPage = 5
const currentPage = ref(0)

// Computed
const hasMore = ref(true)

// Props for customization
const props = defineProps({
  changelogFiles: {
    type: Array,
    default: null // Will be loaded from manifest if null
  },
  baseUrl: {
    type: String,
    default: '/changelogs/'
  },
  useManifest: {
    type: Boolean,
    default: true
  }
})

// Date filtering functionality
const selectedDate = ref('')
const filteredChangelogs = ref([])

// Enhanced reactive state
const allChangelogs = ref([])
const showExportMenu = ref(false)

// Watch for date selection changes
watch(selectedDate, () => {
  filterChangelogsByDate()
})

// Filter changelogs based on selected date
const filterChangelogsByDate = () => {
  if (!selectedDate.value) {
    filteredChangelogs.value = allChangelogs.value
  } else {
    filteredChangelogs.value = allChangelogs.value.filter(changelog => {
      // Parse the changelog date and compare with selected date
      const changelogDate = new Date(changelog.date).toISOString().split('T')[0]
      return changelogDate === selectedDate.value
    })
  }
  // Reset pagination when filtering
  currentPage.value = 0
  visibleChangelogs.value = []
  loadMore()
}

// Fetch changelog files list from manifest or props
const getChangelogFilesList = async () => {
  if (props.changelogFiles) {
    return props.changelogFiles
  }
  
  if (props.useManifest) {
    try {
      const response = await fetch('/changelogs-manifest.json')
      if (response.ok) {
        const manifest = await response.json()
        return manifest.files || []
      }
    } catch (err) {
      console.warn('Failed to load manifest, falling back to default files')
    }
  }
  
  // Fallback to default files
  return [
    '2024-12-15.md',
    '2024-11-20.md', 
    '2024-10-10.md'
  ]
}

// Fetch changelog files
const fetchChangelogs = async () => {
  try {
    loading.value = true
    error.value = null
    
    const changelogFiles = await getChangelogFilesList()
    
    const changelogPromises = changelogFiles.map(async (filename) => {
      try {
        const response = await fetch(`${props.baseUrl}${filename}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filename}`)
        }
        const content = await response.text()
        
        // Parse the markdown content
        const { title, date } = parseMarkdownHeader(content, filename)
        const htmlContent = await parseMarkdownToHTML(content)
        
        return {
          filename,
          title,
          date,
          content: htmlContent,
          raw: content
        }
      } catch (err) {
        console.warn(`Failed to load changelog: ${filename}`, err)
        return null
      }
    })
    
    const results = await Promise.all(changelogPromises)
    allChangelogs.value = results
      .filter(changelog => changelog !== null)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    
    // Initialize filtered results
    filteredChangelogs.value = allChangelogs.value
    
    // Initialize visible changelogs
    loadMore()
    
  } catch (err) {
    error.value = err.message
    console.error('Error fetching changelogs:', err)
  } finally {
    loading.value = false
  }
}

// Parse markdown header to extract title and date
const parseMarkdownHeader = (content, filename) => {
  const lines = content.split('\n')
  const titleLine = lines.find(line => line.startsWith('# '))
  
  let title = 'Untitled Release'
  let date = filename.replace('.md', '')
  
  if (titleLine) {
    title = titleLine.replace('# ', '').trim()
    
    // Extract date from title if present
    const dateMatch = title.match(/(\d{4}-\d{2}-\d{2}|\w+ \d{1,2}, \d{4})/);
    if (dateMatch) {
      date = dateMatch[1]
    }
  }
  
  return { title, date }
}

// Simple markdown to HTML converter for basic formatting
const parseMarkdownToHTML = async (markdown) => {
  return markdown
    .replace(/^# (.*$)/gm, '<h1 class="md-h1">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="md-h2">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="md-h3">$1</h3>')
    .replace(/^\- (.*$)/gm, '<li class="md-li">$1</li>')
    .replace(/(\n<li.*<\/li>)+/g, (match) => `<ul class="md-ul">${match}</ul>`)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="md-code">$1</code>')
    .replace(/\n\n/g, '</p><p class="md-p">')
    .replace(/^(?!<[h|u|l])/gm, '<p class="md-p">')
    .replace(/(?<!>)$/gm, '</p>')
    .replace(/<p class="md-p"><\/p>/g, '')
    .replace(/<p class="md-p">(<[h|u])/g, '$1')
    .replace(/(<\/[h|u|l][^>]*>)<\/p>/g, '$1')
}

// Load more changelogs
const loadMore = () => {
  if (loadingMore.value) return
  
  loadingMore.value = true
  
  setTimeout(() => {
    const startIndex = currentPage.value * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const sourceData = filteredChangelogs.value
    const newItems = sourceData.slice(startIndex, endIndex)
    
    if (currentPage.value === 0) {
      visibleChangelogs.value = newItems
    } else {
      visibleChangelogs.value.push(...newItems)
    }
    
    currentPage.value++
    hasMore.value = endIndex < sourceData.length
    loadingMore.value = false
    
    // Animate new items
    nextTick(() => {
      const newElements = changelogRefs.value.slice(-newItems.length)
      newElements.forEach((el, index) => {
        if (el) {
          setTimeout(() => {
            el.classList.add('animate-in')
          }, index * 100)
        }
      })
    })
  }, 500) // Simulate loading delay
}

// Format date for display
const formatDate = (dateStr) => {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateStr
  }
}

// Intersection Observer for animations
onMounted(() => {
  fetchChangelogs()
  
  // Add keyboard event listener
  document.addEventListener('keydown', handleKeydown)
  
  // Set up intersection observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    },
    { threshold: 0.1 }
  )
  
  // Observe all timeline items
  setTimeout(() => {
    changelogRefs.value.forEach((el) => {
      if (el) observer.observe(el)
    })
  }, 100)
})

onUnmounted(() => {
  // Remove keyboard event listener
  document.removeEventListener('keydown', handleKeydown)
})

// Export functionality
const exportChangelogs = (format) => {
  const dataToExport = visibleChangelogs.value
  
  if (format === 'json') {
    const jsonData = JSON.stringify(dataToExport, null, 2)
    downloadFile(jsonData, 'changelog.json', 'application/json')
  } else if (format === 'markdown') {
    const markdownData = dataToExport.map(changelog => 
      `${changelog.raw}\n\n---\n\n`
    ).join('')
    downloadFile(markdownData, 'changelog.md', 'text/markdown')
  }
  
  showExportMenu.value = false
}

const downloadFile = (content, filename, contentType) => {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    if (showExportMenu.value) {
      showExportMenu.value = false
    } else if (selectedDate.value) {
      selectedDate.value = ''
    }
  } else if (event.key === '/' && !event.ctrlKey && !event.metaKey) {
    event.preventDefault()
    const dateInput = document.querySelector('.date-input')
    if (dateInput) {
      dateInput.focus()
    }
  }
}
</script>

<style scoped>
.changelog-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Header Styles */
.changelog-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--vp-c-divider-light);
}

.changelog-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.changelog-subtitle {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 0.75rem;
  border: 1px solid var(--vp-c-divider-light);
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Date Filter Styles */
.date-filter-container {
  margin-top: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.date-filter-box {
  position: relative;
  display: flex;
  align-items: center;
}

.calendar-icon {
  position: absolute;
  left: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  color: var(--vp-c-text-3);
  z-index: 1;
}

.date-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid var(--vp-c-divider-light);
  border-radius: 9999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

.date-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(var(--vp-c-brand-1), 0.1);
}

.date-input::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  right: 1rem;
  cursor: pointer;
}

.clear-date {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: 2;
}

.clear-date:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-mute);
}

/* No Results State */
.no-results {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--vp-c-text-2);
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.clear-date-btn {
  padding: 0.5rem 1.5rem;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.clear-date-btn:hover {
  background: var(--vp-c-brand-2);
}

/* Timeline Styles */
.timeline {
  position: relative;
}

.timeline-item {
  display: flex;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.timeline-marker {
  position: relative;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  border: 3px solid var(--vp-c-bg);
  box-shadow: 0 0 0 3px var(--vp-c-brand-1);
  z-index: 2;
}

.timeline-line {
  width: 2px;
  flex-grow: 1;
  background: linear-gradient(
    to bottom,
    var(--vp-c-brand-1) 0%,
    transparent 100%
  );
  margin-top: 0.5rem;
}

/* Card Styles */
.changelog-card {
  flex: 1;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.changelog-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand-1);
}

.card-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--vp-c-bg-alt), var(--vp-c-bg-soft));
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.date-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand-1);
  color: white;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.changelog-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.card-content {
  padding: 1.5rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* Markdown content styles */
.card-content :deep(.md-h1) {
  display: none; /* Hide the main title as it's shown in header */
}

.card-content :deep(.md-h2) {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 1.5rem 0 0.75rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.card-content :deep(.md-h3) {
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin: 1rem 0 0.5rem 0;
}

.card-content :deep(.md-ul) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.card-content :deep(.md-li) {
  margin: 0.25rem 0;
  color: var(--vp-c-text-2);
}

.card-content :deep(.md-code) {
  background: var(--vp-c-bg-mute);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875em;
}

.card-content :deep(.md-p) {
  margin: 0.75rem 0;
}

/* Loading States */
.loading-skeleton {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skeleton-item {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 1rem;
  margin-bottom: 2rem;
}

.skeleton-header {
  height: 1.5rem;
  background: linear-gradient(90deg, var(--vp-c-bg-mute) 25%, var(--vp-c-bg-soft) 50%, var(--vp-c-bg-mute) 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  width: 60%;
}

.skeleton-content {
  height: 1rem;
  background: linear-gradient(90deg, var(--vp-c-bg-mute) 25%, var(--vp-c-bg-soft) 50%, var(--vp-c-bg-mute) 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}

.skeleton-content.short {
  width: 40%;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Error State */
.error-message {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--vp-c-text-2);
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.retry-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.retry-btn:hover {
  background: var(--vp-c-brand-2);
}

/* Load More */
.load-more-container {
  text-align: center;
  margin-top: 2rem;
}

.load-more-btn {
  padding: 0.75rem 2rem;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  border-radius: 9999px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.load-more-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-1);
  color: white;
  transform: translateY(-1px);
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Export Menu */
.export-menu {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.export-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.export-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.export-btn:hover {
  background: var(--vp-c-brand-2);
}

.close-export {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  font-size: 1.5rem;
}

/* Export Container */
.export-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
}

.export-trigger {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 9999px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.export-trigger:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .changelog-container {
    padding: 1rem;
  }
  
  .changelog-title {
    font-size: 2rem;
  }
  
  .date-filter-container {
    max-width: 100%;
    margin-top: 1.5rem;
  }
  
  .date-input {
    padding: 0.75rem 3rem 0.75rem 2.5rem;
    font-size: 0.9rem;
  }
  
  .calendar-icon {
    left: 0.75rem;
    width: 1rem;
    height: 1rem;
  }
  
  .clear-date {
    right: 0.75rem;
  }
  
  .timeline-marker {
    margin-right: 1rem;
  }
  
  .timeline-item {
    flex-direction: column;
  }
  
  .timeline-marker {
    flex-direction: row;
    margin-bottom: 1rem;
    margin-right: 0;
  }
  
  .timeline-line {
    width: auto;
    height: 2px;
    margin-top: 0;
    margin-left: 0.5rem;
    flex-grow: 1;
  }
  
  .card-header, .card-content {
    padding: 1rem;
  }
  
  .stats {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .changelog-card {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  }
  
  .changelog-card:hover {
    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.4);
  }
}
</style>
