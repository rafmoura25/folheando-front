import { Link } from "react-router-dom"
import { books } from "../../data/books"
import { reviews } from "../../data/reviews"
import { users } from "../../data/users"
import { categories } from "../../data/categories"
import { calculateAverage } from "../../utils/calculateAverage"

export function Footer() {

  // 📚 Livros mais populares (por média)
  const booksWithAverage = books.map((book) => {
    const bookReviews = reviews.filter(
      (review) => review.bookId === book.id
    )

    const average = calculateAverage(
      bookReviews.map((review) => review.rating)
    )

    return { ...book, average }
  })

  const topBooks = booksWithAverage
    .sort((a, b) => b.average - a.average)
    .slice(0, 5)

  // 👤 Top avaliadores
  const usersWithCount = users.map((user) => {
    const total = reviews.filter(
      (review) => review.userId === user.id
    ).length

    return { ...user, totalReviews: total }
  })

  const topUsers = usersWithCount
    .sort((a, b) => b.totalReviews - a.totalReviews)
    .slice(0, 5)

  return (
    <footer className="bg-navy text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid gap-12
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-4">

          {/* Marca + Contato */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              📖 Folheando
            </h2>

            <p className="text-sm text-gray-300">
              contato@folheando.com.br
            </p>
          </div>

          {/* Livros Populares */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">
              Livros Populares
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              {topBooks.map((book) => (
                <li key={book.id}>
                  <Link
                    to={`/livro/${book.id}`}
                    className="hover:text-white transition"
                  >
                    {book.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Avaliadores */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">
              Top Avaliadores
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              {topUsers.map((user) => (
                <li key={user.id}>
                  {user.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">
              Categorias
            </h3>

            <ul className="space-y-2 text-sm text-gray-300">
              {categories.map((category) => (
                <li key={category.id}>
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        Folheando - Todos os direitos reservados
      </div>

    </footer>
  )
}