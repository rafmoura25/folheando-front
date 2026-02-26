import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getBookById, type Book } from "../services/book"
import { createReview } from "../services/reviews"
import { useAuth } from "../context/AuthContext"

export default function BookDetails() {
  const { id } = useParams()
  const { user } = useAuth()

  const [book, setBook] = useState<Book | null>(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  async function loadBook() {
    if (!id) return
    const data = await getBookById(id)
    setBook(data)
  }

  useEffect(() => {
    loadBook()
  }, [id])

  async function handleReview(e: React.FormEvent) {
    e.preventDefault()
    if (!id) return

    await createReview(id, rating, comment)
    setComment("")
    loadBook()
  }

  if (!book) return <p>Carregando...</p>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="text-gray-500">{book.author}</p>

      <p className="mt-4">{book.description}</p>

      <div className="mt-4">
        ⭐ {book.averageRating} ({book.totalReviews} avaliações)
      </div>

      {/* Lista Reviews */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Avaliações
        </h2>

        {book.reviews?.map((review) => (
          <div
            key={review.id}
            className="border p-4 rounded mb-4"
          >
            <strong>{review.user.name}</strong>
            <div>⭐ {review.rating}</div>
            <p>{review.comment}</p>
          </div>
        ))}
      </section>

      {/* Formulário */}
      {user && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">
            Deixe sua avaliação
          </h2>

          <form onSubmit={handleReview} className="flex flex-col gap-4">
            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-2 rounded"
            />

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-2 rounded"
              placeholder="Escreva sua avaliação..."
            />

            <button className="bg-dark-navy text-white py-2 rounded">
              Enviar Avaliação
            </button>
          </form>
        </section>
      )}
    </div>
  )
}