import { useEffect, useState } from "react"
import { books as booksMock } from "../data/books"
import { reviews } from "../data/reviews"
import { users } from "../data/users"
import { categories } from "../data/categories"
import { calculateAverage } from "../utils/calculateAverage"
import type { Book } from "../types/book"
import { BookCard } from "../components/books/BookCard"
import { CategoryCard } from "../components/categories/CategoryCard"

export function Home() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    setTimeout(() => {
      setBooks(booksMock)
    }, 300)
  }, [])

  // 🔥 Top 5 Populares (ordenado por média)
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

  // 👤 Top 3 Avaliadores
  const usersWithCount = users.map((user) => {
    const total = reviews.filter(
      (review) => review.userId === user.id
    ).length

    return { ...user, totalReviews: total }
  })

  const topUsers = usersWithCount
    .sort((a, b) => b.totalReviews - a.totalReviews)
    .slice(0, 3)

  // 📂 Top 5 Categorias
  const categoriesWithCount = categories.map((category) => {
    const total = books.filter(
      (book) => book.categoryId === category.id
    ).length

    return { ...category, totalBooks: total }
  })

  const topCategories = categoriesWithCount
    .sort((a, b) => b.totalBooks - a.totalBooks)
    .slice(0, 5)

  return (
    <div className="space-y-24">

      {/* 📚 Top 5 Populares */}
      <section>
        <h2 className="text-2xl font-semibold mb-10">
          Top 5 Populares
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {topBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              image={book.image}
              price={book.price}
              rating={book.average}
            />
          ))}
        </div>
      </section>

      {/* 👤 Top 3 Avaliadores */}
      <section>
        <h2 className="text-2xl font-semibold mb-10">
          Top 3 Avaliadores
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <p className="font-semibold text-lg">
                {user.name}
              </p>
              <p className="text-sm text-blue-gray">
                {user.totalReviews} avaliações
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 📂 Top 5 Categorias */}
      <section>
        <h2 className="text-2xl font-semibold mb-10">
          Top 5 Categorias
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {topCategories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              image={category.image}
            />
          ))}
        </div>
      </section>

    </div>
  )
}