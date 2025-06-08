#!/usr/bin/env node

import { readdir, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function generateChangelogManifest() {
  try {
    const changelogDir = join(__dirname, '../../changelogs')
    const publicDir = join(__dirname, '../../public')
    
    // Read all markdown files from changelogs directory
    const files = await readdir(changelogDir)
    const markdownFiles = files
      .filter(file => file.endsWith('.md'))
      .sort((a, b) => {
        // Sort by date (assuming YYYY-MM-DD.md format)
        const dateA = a.replace('.md', '')
        const dateB = b.replace('.md', '')
        return new Date(dateB) - new Date(dateA)
      })
    
    const manifest = {
      files: markdownFiles,
      generated: new Date().toISOString(),
      totalCount: markdownFiles.length
    }
    
    const manifestPath = join(publicDir, 'changelogs-manifest.json')
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2))
    
    console.log(`✅ Generated changelog manifest with ${markdownFiles.length} files`)
    console.log(`📝 Files: ${markdownFiles.join(', ')}`)
    console.log(`📁 Saved to: ${manifestPath}`)
    
  } catch (error) {
    console.error('❌ Error generating changelog manifest:', error)
    process.exit(1)
  }
}

generateChangelogManifest()
