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
              <span className="text-sm text-gray-300">Olá, {user.name}</span>
              <button
                onClick={logout}
                title="Sair"
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition text-gray-300 hover:text-white"
                aria-label="Sair"
              >
                {/* logout icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg font-medium text-[#0B1B3A] transition hover:opacity-80"
              style={{ background: "#FBF0E5" }}
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
              <p className="text-sm text-gray-300">Olá, {user.name}</p>
              <button
                onClick={logout}
                title="Sair"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition py-1"
                aria-label="Sair"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg font-medium text-[#0B1B3A] block text-center transition hover:opacity-80"
              style={{ background: "#FBF0E5" }}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  )
}