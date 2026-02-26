import { useParams, Link } from "react-router-dom"
import { useEffect, useState, useCallback } from "react"
import { getBookById, type Book } from "../services/book"
import { createReview } from "../services/reviews"
import { useAuth } from "../context/AuthContext"

// ─── Star Selector ────────────────────────────────────────────────────────────

function StarSelector({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-transform hover:scale-110 focus:outline-none"
          aria-label={`${star} estrelas`}
        >
          <span
            className={
              star <= (hovered || value)
                ? "text-yellow-400"
                : "text-gray-300"
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  )
}

// ─── Star Display (read-only) ─────────────────────────────────────────────────

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-base ${star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
        >
          ★
        </span>
      ))}
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({
  message,
  type,
  onClose,
}: {
  message: string
  type: "success" | "error"
  onClose: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500)
    return () => clearTimeout(t)
  }, [onClose])

  const base =
    "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white font-medium transition-all animate-bounce-in"
  const color = type === "success" ? "bg-green-500" : "bg-red-500"

  return (
    <div className={`${base} ${color}`}>
      <span>{type === "success" ? "✅" : "❌"}</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        ✕
      </button>
    </div>
  )
}

// Maps exact book titles (lowercase) to local /public images
const LOCAL_COVERS: Record<string, string> = {
  "o hobbit": "/o-hobbit.jpg",
  "game of thrones": "/game-of-thrones.jpg",
  "lord of the rings": "/lord-of-the-rings.jpg",
  "o senhor dos anéis": "/lord-of-the-rings.jpg",
}

function normalizeImageUrl(url: string): string {
  // Already absolute (http/https) or root-relative (/...) — use as-is
  if (url.startsWith("http") || url.startsWith("/")) return url
  // Relative path like "o-hobbit.jpg" → "/o-hobbit.jpg"
  return `/${url}`
}

function resolveBookCover(imageUrl?: string | null, title?: string): string {
  if (imageUrl) return normalizeImageUrl(imageUrl)
  if (title) {
    const key = title.trim().toLowerCase()
    const local = LOCAL_COVERS[key]
    if (local) return local
  }
  return "/livroDefault.png"
}

// ─── Book Cover ───────────────────────────────────────────────────────────────

function BookCover({ imageUrl, title }: { imageUrl?: string | null; title: string }) {
  const [src, setSrc] = useState(() => resolveBookCover(imageUrl, title))
  return (
    <img
      src={src}
      alt={`Capa do livro ${title}`}
      onError={() => setSrc("/livroDefault.png")}
      className="w-full h-full object-cover rounded-2xl shadow-lg"
    />
  )
}


// ─── Skeleton ─────────────────────────────────────────────────────────────────

function BookDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero */}
      <div className="bg-white rounded-2xl shadow-md p-8 flex gap-8">
        <div className="w-44 h-64 bg-gray-200 rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-4 pt-2">
          <div className="h-7 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-20 bg-gray-200 rounded mt-4" />
          <div className="h-8 bg-gray-200 rounded w-1/5 mt-4" />
        </div>
      </div>
      {/* Reviews */}
      <div className="space-y-4 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-xl" />
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BookDetails() {
  const { id } = useParams()
  const { user } = useAuth()

  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(false)

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [toast, setToast] = useState<{
    message: string
    type: "success" | "error"
  } | null>(null)

  const loadBook = useCallback(async () => {
    if (!id) return
    setLoading(true)
    setFetchError(false)
    try {
      const data = await getBookById(id)
      setBook(data)
    } catch {
      setFetchError(true)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadBook()
  }, [loadBook])

  async function handleReview(e: React.FormEvent) {
    e.preventDefault()
    if (!id) return

    setIsSubmitting(true)
    try {
      await createReview(id, rating, comment)
      setComment("")
      setRating(5)
      setToast({ message: "Avaliação enviada com sucesso!", type: "success" })
      await loadBook()
    } catch (err: any) {
      setToast({ message: err.message || "Erro ao enviar avaliação.", type: "error" })
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── States ──

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <BookDetailsSkeleton />
      </div>
    )
  }

  if (fetchError || !book) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center">
        <p className="text-5xl mb-4">📚</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Livro não encontrado
        </h2>
        <p className="text-gray-500">
          Não foi possível carregar os detalhes deste livro.
        </p>
        <button
          onClick={loadBook}
          className="mt-6 px-5 py-2 text-white rounded-lg hover:opacity-90 transition"
          style={{ background: "#0B1B3A" }}
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  // ── Main render ──

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition font-medium"
      >
        ← Voltar
      </Link>

      {/* Hero Card */}
      <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col sm:flex-row gap-8">

        {/* Cover */}
        <div className="w-full sm:w-44 h-56 sm:h-64 flex-shrink-0">
          <BookCover imageUrl={book.imageUrl} title={book.title} />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-3">

          {/* Category badge */}
          <span className="inline-block self-start text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-500">
            {book.category}
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {book.title}
          </h1>

          <p className="text-gray-500 font-medium">{book.author}</p>

          {/* Rating inline */}
          <div className="flex items-center gap-2">
            <StarDisplay rating={book.averageRating} />
            <span className="text-sm font-semibold text-gray-700">
              {Number(book.averageRating).toFixed(1)}
            </span>
            <span className="text-sm text-gray-400">
              ({book.totalReviews} avaliação{book.totalReviews !== 1 ? "ões" : ""})
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm flex-1">
            {book.description}
          </p>

          {/* Price */}
          <div className="pt-2 border-t border-gray-100">
            <span className="text-2xl font-bold text-green-600">
              R$ {Number(book.price).toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Avaliações
          {book.totalReviews > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({book.totalReviews})
            </span>
          )}
        </h2>

        {book.reviews && book.reviews.length > 0 ? (
          <div className="space-y-3">
            {book.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800 text-sm">
                    {review.user.name}
                  </span>
                  <StarDisplay rating={review.rating} />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {review.comment}
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  {new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(review.createdAt))}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic text-sm">
            Nenhuma avaliação ainda. Seja o primeiro!
          </p>
        )}
      </section>

      {/* Review form */}
      {user ? (
        <section className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-lg font-semibold mb-5 text-gray-800">
            Deixe sua avaliação
          </h2>

          <form onSubmit={handleReview} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sua nota
              </label>
              <StarSelector value={rating} onChange={setRating} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentário
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0B1B3A] transition"
                placeholder="Escreva o que você achou do livro..."
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ background: "#0B1B3A" }}
              className="self-start text-white px-6 py-3 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-sm"
            >
              {isSubmitting ? "Enviando..." : "Enviar Avaliação"}
            </button>
          </form>
        </section>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center text-gray-500 text-sm">
          <p>
            <Link
              to="/login"
              className="font-semibold hover:underline"
              style={{ color: "#0B1B3A" }}
            >
              Faça login
            </Link>{" "}
            para deixar sua avaliação.
          </p>
        </div>
      )}
    </div>
  )
}