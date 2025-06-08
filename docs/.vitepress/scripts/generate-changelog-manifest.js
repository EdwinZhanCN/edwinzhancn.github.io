#!/usr/bin/env node

/**
 * Generate changelog manifest for static deployment
 * This script scans the public/changelogs directory and creates a manifest
 * for the ChangeLog.vue component to consume
 */

import { readdir, writeFile, readFile, stat } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function generateChangelogManifest() {
  try {
    // Update paths to use public/changelogs
    const changelogDir = join(__dirname, '../../public/changelogs')
    const outputPath = join(__dirname, '../../public/changelogs-manifest.json')
    
    console.log(`📁 Scanning: ${changelogDir}`)
    
    // Read all markdown files from public/changelogs directory
    const files = await readdir(changelogDir)
    const markdownFiles = []
    
    for (const file of files.filter(f => f.endsWith('.md') && f !== 'README.md')) {
      const filePath = join(changelogDir, file)
      const stats = await stat(filePath)
      const content = await readFile(filePath, 'utf-8')
      
      // Extract date from filename or content
      const dateFromFilename = file.replace('.md', '')
      const titleMatch = content.match(/^# (.+)$/m)
      const title = titleMatch ? titleMatch[1] : 'Untitled'
      
      markdownFiles.push({
        filename: file,
        date: dateFromFilename,
        title: title,
        lastModified: stats.mtime.toISOString(),
        size: stats.size
      })
    }
    
    // Sort by date (newest first)
    markdownFiles.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    const manifest = {
      generated: new Date().toISOString(),
      totalCount: markdownFiles.length,
      files: markdownFiles.map(f => f.filename),
      metadata: markdownFiles
    }
    
    await writeFile(outputPath, JSON.stringify(manifest, null, 2))
    
    console.log(`✅ Generated changelog manifest:`)
    console.log(`   📄 Files: ${markdownFiles.length}`)
    console.log(`   📍 Output: ${outputPath}`)
    console.log(`   📋 Files included:`)
    markdownFiles.forEach(file => {
      console.log(`      - ${file.filename} (${file.title})`)
    })
    
  } catch (error) {
    console.error('❌ Error generating changelog manifest:', error)
    process.exit(1)
  }
}

generateChangelogManifest()
