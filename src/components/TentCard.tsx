import { Tent } from "@/data/tents"

const TAG_STYLES: Record<string, string> = {
  "ДУУССАН": "bg-gray-500 text-white",
  "ЭРЭЛТТЭЙ": "bg-red-500 text-white",
  "ХОВОР ҮЛДСЭН": "bg-orange-500 text-white",
}

export default function TentCard({ tent }: { tent: Tent }) {
  const discount = Math.round((1 - tent.salePrice / tent.originalPrice) * 100)
  const isSoldOut = tent.tag === "ДУУССАН"

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${isSoldOut ? "opacity-60" : ""}`}>
      <div className="relative bg-gray-100 aspect-square flex items-center justify-center">
        <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>

        {!isSoldOut && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% ХӨНГӨЛӨЛТ
          </span>
        )}

        {tent.tag && (
          <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded ${TAG_STYLES[tent.tag] ?? "bg-gray-400 text-white"}`}>
            {tent.tag}
          </span>
        )}
      </div>

      <div className="p-3">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{tent.brand}</p>
        <p className="text-sm font-semibold text-gray-800 mt-0.5 leading-snug line-clamp-2">{tent.name}</p>
        <p className="text-xs text-gray-400 mt-1">{tent.capacity}</p>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-lg font-bold text-red-600">
            ₮{tent.salePrice.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400 line-through mb-0.5">
            ₮{tent.originalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
