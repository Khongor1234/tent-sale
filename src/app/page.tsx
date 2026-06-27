import TentCard from "@/components/TentCard"
import { tents } from "@/data/tents"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Гарчиг */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-800">⛺ WILD-1</span>
            <span className="text-xs text-gray-400">Эрдэнэт дэлгүүр</span>
          </div>
          <span className="text-xs bg-red-600 text-white px-3 py-1 rounded-full font-medium">
            Майхан худалдаа явагдаж байна
          </span>
        </div>
      </header>

      {/* Баннер */}
      <div className="bg-red-600 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-medium tracking-widest mb-1 opacity-80">ОНЦГОЙ ХЯМДРАЛ</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
            Майхан Худалдаа 2024
          </h1>
          <p className="text-sm opacity-80">Бүх барааны үнэд 40% хүртэл хөнгөлөлт · Тоо хэмжээ хязгаарлагдмал</p>
          <div className="mt-4 inline-flex items-center gap-3 bg-white/10 rounded-full px-5 py-2 text-sm">
            <span>🏕️</span>
            <span>Нөөц дуустал онцгой үнэтэй</span>
          </div>
        </div>
      </div>

      {/* Мэдээллийн мөр */}
      <div className="bg-gray-800 text-white py-3">
        <div className="max-w-6xl mx-auto px-4 flex justify-center gap-8 text-sm">
          <span>📦 Нийт <strong>{tents.length}</strong> бараа</span>
          <span>🏷️ Хамгийн их <strong>40% хөнгөлөлт</strong></span>
          <span>⚡ Эхэлж ирсэн хүн авна</span>
        </div>
      </div>

      {/* Бүтээгдэхүүний grid */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-700">Хямдралтай бараанууд</h2>
          <span className="text-sm text-gray-400">Нийт {tents.length} ширхэг</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {tents.map((tent) => (
            <TentCard key={tent.id} tent={tent} />
          ))}
        </div>
      </main>

      {/* Хөл хэсэг */}
      <footer className="bg-gray-800 text-gray-400 text-center py-6 text-xs mt-8">
        <p>© 2024 WILD-1 Эрдэнэт дэлгүүр</p>
        <p className="mt-1">Үнэ болон нөөцийн мэдээлэл урьдчилан мэдэгдэлгүй өөрчлөгдөж болно.</p>
      </footer>
    </div>
  )
}
