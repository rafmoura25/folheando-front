import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getBookById } from "../services/booksService"
import type { Book } from "../types/book"
import { reviews } from "../data/reviews"
import { users } from "../data/users"
import { calculateAverage } from "../utils/calculateAverage"

export function BookDetails() {
  const { id } = useParams()

  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    getBookById(id).then((data) => {
      setBook(data || null)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg">Carregando livro...</p>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-red-500">
          Livro não encontrado.
        </p>
      </div>
    )
  }

  // 🔎 Buscar reviews do livro
  const bookReviews = reviews.filter(
    (review) => review.bookId === book.id
  )

  // ⭐ Calcular média
  const average = calculateAverage(
    bookReviews.map((review) => review.rating)
  )

  return (
    <div className="space-y-16">

      {/* Parte superior */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Capa */}
        <div>
          <img
            src={book.image}
            alt={book.title}
            className="rounded-2xl shadow-lg w-full"
          />
        </div>

        {/* Informações */}
        <div className="md:col-span-2 space-y-6">

          <div>
            <h1 className="text-3xl font-bold">
              {book.title}
            </h1>
            <p className="text-blue-gray">
              {book.author}
            </p>
          </div>

          {/* Média */}
          <div className="flex items-center gap-4">
            <span className="text-primary text-2xl font-bold">
              {average}
            </span>

            <div className="text-yellow-400 text-xl">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                  {i < Math.round(average) ? "★" : "☆"}
                </span>
              ))}
            </div>

            <span className="text-sm text-gray-500">
              ({bookReviews.length} avaliações)
            </span>
          </div>

          {/* Descrição */}
          <p className="text-gray-600">
            {book.description}
          </p>

          {/* Botão */}
          <button className="bg-navy text-white px-6 py-3 rounded-lg hover:opacity-90 transition">
            Comprar na Amazon
          </button>

        </div>
      </div>

      {/* Seção de Avaliações */}
      <div className="bg-white p-8 rounded-2xl shadow-md space-y-8">

        <h2 className="text-2xl font-semibold">
          Comentários
        </h2>

        {bookReviews.length === 0 && (
          <p className="text-gray-500">
            Ainda não há avaliações para este livro.
          </p>
        )}

        {bookReviews.map((review) => {
          const user = users.find(
            (user) => user.id === review.userId
          )

          return (
            <div
              key={review.id}
              className="border-b pb-6"
            >
              <p className="font-semibold">
                {user?.name || "Usuário"}
              </p>

              <div className="text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i < review.rating ? "★" : "☆"}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 mt-2">
                {review.comment}
              </p>
            </div>
          )
        })}

      </div>

    </div>
  )
}