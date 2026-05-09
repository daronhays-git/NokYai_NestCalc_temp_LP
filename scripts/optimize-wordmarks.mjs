import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.resolve(__dirname, '..', 'src', 'assets')

const WEBP_OPTS = { quality: 90, effort: 6, alphaQuality: 100 }
const PNG_OPTS = { compressionLevel: 9 }

const wordmarks = [
  'casawise-wordmark-final.png',
  'homefastcalc-wordmark-final.png',
]

// Full-size WebP from each wordmark PNG
for (const filename of wordmarks) {
  const input = path.join(assetsDir, filename)
  const output = path.join(assetsDir, filename.replace(/\.png$/, '.webp'))
  await sharp(input).webp(WEBP_OPTS).toFile(output)
  console.log(`✓ ${filename} → ${path.basename(output)}`)
}

// 320px-wide variants (WebP + PNG) — wordmarks render at ~150px so 320px covers 2× DPR with margin
for (const filename of wordmarks) {
  const input = path.join(assetsDir, filename)
  const base = filename.replace(/\.png$/, '')
  const webpOut = path.join(assetsDir, `${base}-320.webp`)
  const pngOut = path.join(assetsDir, `${base}-320.png`)
  await sharp(input).resize({ width: 320 }).webp(WEBP_OPTS).toFile(webpOut)
  await sharp(input).resize({ width: 320 }).png(PNG_OPTS).toFile(pngOut)
  console.log(`✓ ${filename} → ${path.basename(webpOut)}, ${path.basename(pngOut)}`)
}

// 96×96 brand logo variants (WebP + PNG) — Footer h-12 = 48px, 96px covers 2× DPR
const logo = 'nestcalc-logo-gold-green.png'
const logoInput = path.join(assetsDir, logo)
const logoBase = logo.replace(/\.png$/, '')
const logoWebpOut = path.join(assetsDir, `${logoBase}-96.webp`)
const logoPngOut = path.join(assetsDir, `${logoBase}-96.png`)
await sharp(logoInput).resize({ width: 96, height: 96 }).webp(WEBP_OPTS).toFile(logoWebpOut)
await sharp(logoInput).resize({ width: 96, height: 96 }).png(PNG_OPTS).toFile(logoPngOut)
console.log(`✓ ${logo} → ${path.basename(logoWebpOut)}, ${path.basename(logoPngOut)}`)
