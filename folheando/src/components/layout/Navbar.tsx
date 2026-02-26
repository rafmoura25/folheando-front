import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useState, useEffect } from "react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <header className="bg-[#0B1B3A] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
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
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/livros" className="text-sm hover:text-gray-300 transition">
            TODOS OS LIVROS
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

        {/* Mobile: Login button + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {!user && (
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#0B1B3A] transition hover:opacity-80"
              style={{ background: "#FBF0E5" }}
            >
              Login
            </Link>
          )}
          {user && (
            <span className="text-xs text-gray-400 truncate max-w-[100px]">{user.name}</span>
          )}
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              {isOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu — animated slide */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <nav className="px-4 pb-4 space-y-1 border-t border-white/10 pt-3">
          <Link
            to="/livros"
            className="flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-white/10 transition text-sm font-medium"
          >
            📚 Todos os Livros
          </Link>

          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-white/10 transition text-sm font-medium text-gray-300 w-full text-left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sair
            </button>
          ) : (
            <Link
              to="/register"
              className="flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-white/10 transition text-sm font-medium"
            >
              ✉️ Criar conta
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}