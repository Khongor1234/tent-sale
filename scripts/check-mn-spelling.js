const fs = require('fs')
const path = require('path')
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

let totalErrors = 0

for (const file of filesToCheck) {
  const filePath = path.join(__dirname, '..', file)
  if (!fs.existsSync(filePath)) continue

  const content = fs.readFileSync(filePath, 'utf8')
  const words = [...new Set(content.match(/[А-Яа-яӨөҮүЁё]{2,}/g) || [])]
  const errors = []

  for (const word of words) {
    if (!spell.correct(word)) {
      errors.push({ word, suggestions: spell.suggest(word).slice(0, 3) })
    }
  }

  if (errors.length > 0) {
    console.log(`\n❌ ${file}:`)
    for (const { word, suggestions } of errors) {
      const hint = suggestions.length ? ` → ${suggestions.join(', ')}` : ''
      console.log(`   "${word}"${hint}`)
    }
    totalErrors += errors.length
  } else {
    console.log(`✅ ${file}`)
  }
}

if (totalErrors > 0) {
  console.log(`\n⛔ Нийт ${totalErrors} үгийн алдаа олдлоо — deploy цуцлагдлаа.\n`)
  process.exit(1)
} else {
  console.log('\n✅ Алдаа олдсонгүй — deploy үргэлжилнэ.\n')
}
