import { NextRequest, NextResponse } from "next/server"
import { getSpell } from "@/lib/spellcheck"

export async function POST(req: NextRequest) {
  const { text } = await req.json()

  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "Текст оруулна уу" }, { status: 400 })
  }

  const checker = await getSpell()
  const words = text.match(/[А-Яа-яӨөҮүЁё]+/g) ?? []

  const results = words.map((word: string) => ({
    word,
    correct: checker.correct(word),
    suggestions: checker.correct(word) ? [] : checker.suggest(word).slice(0, 5),
  }))

  return NextResponse.json({ results })
}
