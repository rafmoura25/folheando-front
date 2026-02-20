import { useState } from "react"
import { Link, NavLink } from "react-router-dom"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="h-16 flex items-center justify-between gap-6">

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

          {/* Links Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="#" className="text-sm hover:text-primary">
              MAIS AVALIADOS
            </NavLink>

            <NavLink to="#" className="text-sm hover:text-primary">
              MAIS POPULARES
            </NavLink>

            <NavLink to="#" className="text-sm hover:text-primary">
              CATEGORIAS
            </NavLink>

            <button className="bg-beige text-black px-4 py-2 rounded-md font-semibold">
              LOGIN
            </button>
          </div>

          {/* Botão Mobile */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

        </div>

        {/* Busca Mobile */}
        <div className="lg:hidden pb-4">
          <input
            type="text"
            placeholder="Buscar livros..."
            className="w-full px-4 py-2 rounded-md text-black"
          />
        </div>

        {/* Menu Mobile */}
        {open && (
          <div className="lg:hidden pb-4 space-y-3">
            <NavLink to="#" className="block">
              MAIS AVALIADOS
            </NavLink>

            <NavLink to="#" className="block">
              MAIS POPULARES
            </NavLink>

            <NavLink to="#" className="block">
              CATEGORIAS
            </NavLink>

            <button className="bg-beige text-black px-4 py-2 rounded-md w-full">
              LOGIN
            </button>
          </div>
        )}

      </div>
    </header>
  )
}