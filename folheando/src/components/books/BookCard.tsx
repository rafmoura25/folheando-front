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
    <Link to={`/livro/${id}`} className="block">
      <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer">
        <div className="aspect-[2/3] w-full overflow-hidden">
          <img
            src={src}
            alt={title}
            onError={() => setSrc("/livroDefault.png")}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-3 text-center">
          <h3 className="font-semibold text-xs sm:text-sm line-clamp-2">{title}</h3>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{author}</p>

          <div className="flex justify-center gap-0.5 mt-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>

          <p className="font-bold text-sm mt-1">{price}</p>
        </div>
      </div>
    </Link>
  )
}