#!/usr/bin/env node
/**
 * Build time copy check. Fails the build when:
 *   1. Rendered copy in .output/public contains an en dash, an em dash, "lorem", "TODO", or square brackets.
 *   2. Any project source or doc file contains an en dash or an em dash.
 * Rendered copy means visible text plus meta descriptions, titles, alt, aria-label and placeholder values.
 * Scripts, styles and JSON-LD are skipped because brackets are valid there.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, relative, extname } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const out = join(root, '.output/public')
const EN = '\u2013'
const EM = '\u2014'
const DASH_RE = new RegExp(`[${EN}${EM}]|&[nm]dash;|&#821[12];|&#x201[34];`, 'i')
const problems = []

function walk(dir, skip = new Set()) {
  const files = []
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) files.push(...walk(p, skip))
    else files.push(p)
  }
  return files
}

function decode(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
}

function renderedCopy(html) {
  const attrs = []
  const attrRe = /\s(?:alt|title|aria-label|placeholder)="([^"]*)"/g
  const metaRe = /<meta[^>]+content="([^"]*)"[^>]*>/g
  for (const m of html.matchAll(attrRe)) attrs.push(m[1])
  for (const m of html.matchAll(metaRe)) {
    // Skip URL valued meta (og:url, og:image) since they are not copy.
    if (!/^https?:\/\//.test(m[1])) attrs.push(m[1])
  }
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
  return decode([text, ...attrs].join('\n'))
}

// 1. Rendered output
if (!existsSync(out)) {
  console.error('check-copy: .output/public not found. Run npm run generate first.')
  process.exit(1)
}
for (const file of walk(out).filter((f) => extname(f) === '.html')) {
  const copy = renderedCopy(readFileSync(file, 'utf8'))
  const rel = relative(root, file)
  const checks = [
    [DASH_RE, 'en or em dash'],
    [/lorem/i, '"lorem"'],
    [/\bTODO\b/, '"TODO"'],
    [/[[\]]/, 'square bracket'],
  ]
  const flat = copy.replace(/\s+/g, ' ')
  for (const [re, label] of checks) {
    const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g')
    for (const m of flat.matchAll(g)) {
      const at = m.index ?? 0
      problems.push(`${rel}: ${label} in rendered copy: "...${flat.slice(Math.max(0, at - 40), at + 40).trim()}..."`)
    }
  }
}

// 2. Source and docs: no dashes anywhere
const skip = new Set(['node_modules', '.nuxt', '.output', '.data', 'dist', 'package-lock.json', '.git', 'recordings'])
const textExt = new Set(['.ts', '.vue', '.js', '.mjs', '.css', '.md', '.json', '.html', '.txt', '.svg', '.example', ''])
for (const file of walk(root, skip)) {
  if (!textExt.has(extname(file))) continue
  const src = readFileSync(file, 'utf8')
  src.split('\n').forEach((line, i) => {
    if (DASH_RE.test(line)) problems.push(`${relative(root, file)}:${i + 1}: en or em dash in source`)
  })
}

if (problems.length) {
  console.error(`check-copy: ${problems.length} problem(s)\n` + problems.map((p) => '  ' + p).join('\n'))
  process.exit(1)
}
console.log('check-copy: rendered copy and sources are clean.')
