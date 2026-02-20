import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout/Layout"
import { Home } from "./pages/Home"
import { BookDetails } from "./pages/BookDetails"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="livro/:id" element={<BookDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App