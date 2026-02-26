import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getBooks, getTopRatedBooks, type Book } from "../services/book"
import { BookCard } from "../components/books/BookCard"
import { CategoryCard } from "../components/categories/CategoryCard"
import { getCategories, type Category } from "../services/categories"
import { getTopReviewers, type TopUser } from "../services/users"

export function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [topUsers, setTopUsers] = useState<TopUser[]>([])
  const [topRated, setTopRated] = useState<Book[]>([])

  useEffect(() => {
    async function load() {
      const booksData = await getBooks()
      const categoriesData = await getCategories()
      const usersData = await getTopReviewers()
      const topRatedData = await getTopRatedBooks()

      setBooks(booksData)
      setCategories(categoriesData)
      setTopUsers(usersData)
      setTopRated(topRatedData)
    }

    load()
  }, [])

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
    <div className="space-y-12 sm:space-y-20">

      {/* 📚 Top 5 Populares */}
      <section>
        <div className="flex items-center justify-between mb-5 sm:mb-8">
          <h2 className="text-2xl font-semibold">
            Top 5 Populares
          </h2>
          <Link
            to="/livros"
            className="text-sm font-medium hover:opacity-70 transition"
            style={{ color: "#0B1B3A" }}
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 lg:gap-8">
          {topRated.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              imageUrl={book.imageUrl}
              price={book.price}
              rating={book.averageRating}
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
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">
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
              image="/dark.png"
            />
          ))}
        </div>
      </section>

    </div>
  )
}