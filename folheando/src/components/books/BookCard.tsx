import { useState } from "react"
import { Link } from "react-router-dom"

const LOCAL_COVERS: Record<string, string> = {
  "o hobbit": "/o-hobbit.jpg",
  "game of thrones": "/game-of-thrones.jpg",
  "lord of the rings": "/lord-of-the-rings.jpg",
  "o senhor dos anéis": "/lord-of-the-rings.jpg",
}

function normalizeImageUrl(url: string): string {
  if (url.startsWith("http") || url.startsWith("/")) return url
  return `/${url}`
}

function resolveImage(imageUrl?: string | null, title?: string): string {
  if (imageUrl) return normalizeImageUrl(imageUrl)
  if (title) {
    const local = LOCAL_COVERS[title.trim().toLowerCase()]
    if (local) return local
  }
  return "/livroDefault.png"
}

interface Props {
  title: string
  author: string
  imageUrl?: string | null
  price: string
  rating?: number
  id?: string
}

export function BookCard({
  title,
  author,
  imageUrl,
  price,
  rating = 5,
  id = "1",
}: Props) {
  const [src, setSrc] = useState(() => resolveImage(imageUrl, title))

  return (
    <Link to={`/livro/${id}`} className="block group">
      <div className="w-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group-hover:-translate-y-1">

        {/* Cover with badge + overlay */}
        <div className="aspect-[2/3] w-full overflow-hidden relative">
          <img
            src={src}
            alt={title}
            onError={() => setSrc("/livroDefault.png")}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
          {/* Rating badge */}
          {rating > 0 && (
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-800 px-2 py-0.5 rounded-full shadow flex items-center gap-0.5">
              <span className="text-yellow-400">★</span> {rating.toFixed(1)}
            </div>
          )}
        </div>

        <div className="p-3 text-center">
          <h3 className="font-semibold text-xs sm:text-sm line-clamp-2 text-gray-900">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{author}</p>
          <p className="font-bold text-sm mt-1.5 text-gray-800">{price}</p>
        </div>
      </div>
    </Link>
  )
}