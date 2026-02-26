import { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { getBooks, type Book } from "../services/book"
import { BookCard } from "../components/books/BookCard"

type SortOption = "rating" | "az" | "za"

export default function AllBooks() {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)
    const [sort, setSort] = useState<SortOption>("rating")
    const [search, setSearch] = useState("")

    useEffect(() => {
        getBooks()
            .then(setBooks)
            .finally(() => setLoading(false))
    }, [])

    const filtered = useMemo(() => {
        let result = [...books]

        if (search.trim()) {
            const q = search.trim().toLowerCase()
            result = result.filter(
                (b) =>
                    b.title.toLowerCase().includes(q) ||
                    b.author.toLowerCase().includes(q)
            )
        }

        if (sort === "rating") {
            result.sort((a, b) => b.averageRating - a.averageRating)
        } else if (sort === "az") {
            result.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"))
        } else if (sort === "za") {
            result.sort((a, b) => b.title.localeCompare(a.title, "pt-BR"))
        }

        return result
    }, [books, sort, search])

    const sortOptions: { value: SortOption; label: string }[] = [
        { value: "rating", label: "⭐ Melhor Nota" },
        { value: "az", label: "A → Z" },
        { value: "za", label: "Z → A" },
    ]

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <Link
                        to="/"
                        className="text-sm text-gray-500 hover:text-gray-800 transition font-medium"
                    >
                        ← Voltar
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mt-1">
                        Todos os Livros
                    </h1>
                    {!loading && (
                        <p className="text-gray-400 text-sm mt-1">
                            {filtered.length} livro{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
                        </p>
                    )}
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por título ou autor..."
                        className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1B3A] transition w-full sm:w-64"
                    />

                    {/* Sort tabs */}
                    <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white self-start">
                        {sortOptions.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setSort(opt.value)}
                                className={`px-4 py-2 text-sm font-medium transition whitespace-nowrap ${sort === opt.value
                                        ? "text-white"
                                        : "text-gray-600 hover:bg-gray-50"
                                    }`}
                                style={sort === opt.value ? { background: "#0B1B3A" } : {}}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse bg-white rounded-2xl shadow-md overflow-hidden"
                        >
                            <div className="h-72 bg-gray-200" />
                            <div className="p-4 space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-24">
                    <p className="text-5xl mb-4">📚</p>
                    <p className="text-gray-500">Nenhum livro encontrado.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {filtered.map((book) => (
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
            )}
        </div>
    )
}
