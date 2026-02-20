import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom"

export function Layout() {
  return (
    <div className="bg-almost-white min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-12">
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}