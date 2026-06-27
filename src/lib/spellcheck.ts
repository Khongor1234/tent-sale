import fs from "node:fs"
import path from "node:path"
// @ts-expect-error no types
import nspell from "nspell"

type Spell = {
  correct: (word: string) => boolean
  suggest: (word: string) => string[]
}

let spell: Spell | null = null
let loading: Promise<Spell> | null = null

export async function getSpell(): Promise<Spell> {
  if (spell) return spell
  if (loading) return loading

  loading = new Promise<Spell>((resolve) => {
    const dictDir = path.join(process.cwd(), "node_modules/dictionary-mn")
    const aff = fs.readFileSync(path.join(dictDir, "index.aff"))
    const dic = fs.readFileSync(path.join(dictDir, "index.dic"))
    spell = nspell({ aff, dic })
    resolve(spell!)
  })

  return loading
}

// Pre-warm: start loading immediately when this module is imported
getSpell().catch(console.error)
