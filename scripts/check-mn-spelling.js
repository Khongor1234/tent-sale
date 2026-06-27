const fs = require('fs')
const path = require('path')

// Vercel дээр spell check алгасана — зөвхөн локалд ажиллана
if (process.env.VERCEL) {
  console.log('⏭️  Vercel build — spell check алгасана')
  process.exit(0)
}

const nspell = require('nspell')

const dictDir = path.join(__dirname, '../node_modules/dictionary-mn')
const aff = fs.readFileSync(path.join(dictDir, 'index.aff'))
const dic = fs.readFileSync(path.join(dictDir, 'index.dic'))

console.log('📖 Монгол толь ачаалж байна...')
const spell = nspell({ aff, dic })

const filesToCheck = [
  'src/data/tents.ts',
  'src/app/page.tsx',
  'src/components/TentCard.tsx',
]

let totalFixed = 0

for (const file of filesToCheck) {
  const filePath = path.join(__dirname, '..', file)
  if (!fs.existsSync(filePath)) continue

  let content = fs.readFileSync(filePath, 'utf8')
  const words = [...new Set(content.match(/[А-Яа-яӨөҮүЁё]{2,}/g) || [])]
  const fixed = []

  for (const word of words) {
    if (!spell.correct(word)) {
      const suggestions = spell.suggest(word)
      if (suggestions.length > 0) {
        const replacement = suggestions[0]
        content = content.replaceAll(word, replacement)
        fixed.push(`"${word}" → "${replacement}"`)
      }
    }
  }

  if (fixed.length > 0) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`\n🔧 ${file} — ${fixed.length} үг засагдлаа:`)
    fixed.forEach(f => console.log(`   ${f}`))
    totalFixed += fixed.length
  } else {
    console.log(`✅ ${file}`)
  }
}

if (totalFixed > 0) {
  console.log(`\n✅ Нийт ${totalFixed} үг автоматаар засагдлаа — deploy үргэлжилнэ.\n`)
} else {
  console.log('\n✅ Алдаа олдсонгүй — deploy үргэлжилнэ.\n')
}
