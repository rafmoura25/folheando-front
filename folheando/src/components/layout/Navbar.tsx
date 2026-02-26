import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useState } from "react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-[#0B1B3A] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          📖 Folheando
        </Link>

        {/* Busca - Desktop */}
        <div className="hidden lg:flex flex-1 justify-center">
          <input
            type="text"
            placeholder="Buscar livros..."
            className="w-[420px] px-4 py-2 rounded-md text-black outline-none"
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-gray-300">
            MAIS AVALIADOS
          </Link>
          <Link to="/" className="hover:text-gray-300">
            MAIS POPULARES
          </Link>
          <Link to="/" className="hover:text-gray-300">
            CATEGORIAS
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">Olá, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-pink-200 text-black px-4 py-2 rounded-lg hover:bg-pink-300"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4">
          <Link to="/" className="block">
            MAIS AVALIADOS
          </Link>
          <Link to="/" className="block">
            MAIS POPULARES
          </Link>
          <Link to="/" className="block">
            CATEGORIAS
          </Link>

          {user ? (
            <>
              <p>Olá, {user.name}</p>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-lg w-full"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-pink-200 text-black px-4 py-2 rounded-lg block text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  )
}