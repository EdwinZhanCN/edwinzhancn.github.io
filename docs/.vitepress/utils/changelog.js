import { globSync } from 'glob'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Function to get all changelog files
export function getChangelogFiles() {
  const changelogDir = path.join(__dirname, '../changelogs')
  const files = globSync('*.md', { cwd: changelogDir })
  
  // Sort files by date (assuming filename format: YYYY-MM-DD.md)
  return files.sort((a, b) => {
    const dateA = a.replace('.md', '')
    const dateB = b.replace('.md', '')
    return new Date(dateB) - new Date(dateA)
  })
}

// For build-time generation
export function generateChangelogManifest() {
  const files = getChangelogFiles()
  return {
    files,
    generated: new Date().toISOString()
  }
}
