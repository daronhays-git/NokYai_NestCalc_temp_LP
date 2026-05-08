import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.resolve(__dirname, '..', 'src', 'assets')

const wordmarks = [
  'casawise-wordmark-final.png',
  'homefastcalc-wordmark-final.png',
]

for (const filename of wordmarks) {
  const input = path.join(assetsDir, filename)
  const output = path.join(
    assetsDir,
    filename.replace(/\.png$/, '.webp')
  )
  await sharp(input)
    .webp({ quality: 90, effort: 6, alphaQuality: 100 })
    .toFile(output)
  console.log(`✓ ${filename} → ${path.basename(output)}`)
}
