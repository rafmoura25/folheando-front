import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getBooks, getTopRatedBooks, type Book } from "../services/book"
import { BookCard } from "../components/books/BookCard"
import { getCategories, type Category } from "../services/categories"
import { getTopReviewers, type TopUser } from "../services/users"

// Category emoji mapping
const CATEGORY_EMOJIS: Record<string, string> = {
  fantasia: "🧙", ficção: "🚀", romance: "💕", terror: "👻",
  biografia: "👤", história: "📜", ciência: "🔬", aventura: "⚔️",
  drama: "🎭", poesia: "✍️", filosofia: "🤔", tecnologia: "💻",
  default: "📚",
}

function getCategoryEmoji(name: string): string {
  const key = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  return Object.entries(CATEGORY_EMOJIS).find(([k]) => key.includes(k))?.[1] ?? CATEGORY_EMOJIS.default
}

function SectionHeader({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-5 sm:mb-8">
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 rounded-full bg-[#0B1B3A]" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{children}</h2>
      </div>
      {action}
    </div>
  )
}

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

  const topCategories = categories
    .map((cat) => ({ ...cat, totalBooks: books.filter((b) => b.categoryId === cat.id).length }))
    .sort((a, b) => b.totalBooks - a.totalBooks)
    .slice(0, 6)

  return (
    <div>
      {/* ✨ Hero Section */}
      <section className="relative -mx-4 sm:-mx-6 -mt-6 sm:-mt-10 lg:-mt-16 mb-12 sm:mb-20 overflow-hidden">
        <div
          className="relative px-6 sm:px-12 py-16 sm:py-24 text-white text-center"
          style={{ background: "linear-gradient(135deg, #0B1B3A 0%, #1a3a6b 60%, #0f2d5a 100%)" }}
        >
          {/* subtle dot pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/20">
              📖 Sua estante digital
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
              Descubra sua próxima<br />
              <span style={{ color: "#FBF0E5" }}>leitura favorita</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg mb-8 max-w-lg mx-auto">
              Avalie livros, leia reviews de outros leitores e compartilhe o que está na sua cabeceira.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/livros"
                className="px-6 py-3 rounded-xl font-semibold text-[#0B1B3A] hover:opacity-90 transition"
                style={{ background: "#FBF0E5" }}
              >
                Explorar livros →
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 rounded-xl font-semibold text-white border border-white/30 hover:bg-white/10 transition"
              >
                Criar conta grátis
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-14 sm:space-y-20">

        {/* 📚 Top Populares */}
        <section>
          <SectionHeader
            action={
              <Link to="/livros" className="text-sm font-medium text-[#0B1B3A] hover:opacity-70 transition">
                Ver todos →
              </Link>
            }
          >
            Top Populares
          </SectionHeader>
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

        {/* 👤 Top Avaliadores */}
        {topUsers.length > 0 && (
          <section>
            <SectionHeader>Top Avaliadores</SectionHeader>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {topUsers.map((user, i) => (
                <div
                  key={user.id}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition flex items-center gap-4 border border-gray-100"
                >
                  {/* Avatar with initial */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{
                      background: i === 0 ? "#0B1B3A" : i === 1 ? "#1a3a6b" : "#2d5a9b",
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.totalReviews} avaliações</p>
                  </div>
                  {i === 0 && (
                    <span className="ml-auto text-lg" title="1º lugar">🏆</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 📂 Categorias */}
        {topCategories.length > 0 && (
          <section>
            <SectionHeader>Explorar por Categoria</SectionHeader>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {topCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition cursor-pointer border border-gray-100 hover:border-[#0B1B3A]/20 group"
                >
                  <div className="text-3xl mb-2">{getCategoryEmoji(cat.name)}</div>
                  <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-[#0B1B3A] transition">
                    {cat.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{cat.totalBooks} livros</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}