import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { Footer } from "./Footer"

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 lg:py-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}