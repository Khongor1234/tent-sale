"use client"

import { useState, useCallback } from "react"

interface CheckResult {
  word: string
  correct: boolean
  suggestions: string[]
}

export default function SpellChecker() {
  const [text, setText] = useState("")
  const [results, setResults] = useState<CheckResult[]>([])
  const [loading, setLoading] = useState(false)

  const checkSpelling = useCallback(async () => {
    if (!text.trim()) return
    setLoading(true)

    const res = await fetch("/api/spellcheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })

    const data = await res.json()
    setResults(data.results)
    setLoading(false)
  }, [text])

  const wrongWords = results.filter((r) => !r.correct)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-bold text-gray-700 mb-3">🔤 Монгол үгийн алдаа шалгах</h3>

      <textarea
        className="w-full border border-gray-200 rounded p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-300"
        rows={3}
        placeholder="Монгол текст оруулна уу..."
        value={text}
        onChange={(e) => { setText(e.target.value); setResults([]) }}
      />

      <button
        onClick={checkSpelling}
        disabled={loading || !text.trim()}
        className="mt-2 bg-red-600 text-white text-xs px-4 py-2 rounded hover:bg-red-700 disabled:opacity-40 transition-colors"
      >
        {loading ? "Шалгаж байна..." : "Алдаа шалгах"}
      </button>

      {results.length > 0 && (
        <div className="mt-3">
          {wrongWords.length === 0 ? (
            <p className="text-xs text-green-600 font-medium">✅ Алдаа олдсонгүй</p>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-red-600 font-medium">❌ {wrongWords.length} алдаа олдлоо</p>
              {wrongWords.map((r) => (
                <div key={r.word} className="text-xs bg-red-50 border border-red-100 rounded p-2">
                  <span className="font-semibold text-red-700">{r.word}</span>
                  {r.suggestions.length > 0 && (
                    <span className="text-gray-500"> → {r.suggestions.slice(0, 3).join(", ")}</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
