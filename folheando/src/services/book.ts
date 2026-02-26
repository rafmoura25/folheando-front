import { apiFetch } from "../lib/api"

export interface Book {
  id: string
  title: string
  author: string
  description: string
  price: string
  category: string
  categoryId: string
  averageRating: number
  totalReviews: number
  reviews?: {
    id: string
    rating: number
    comment: string
    user: {
      id: string
      name: string
    }
  }[]
}

export function getBooks() {
  return apiFetch<Book[]>("/books")
}

export function getTopRatedBooks() {
  return apiFetch<Book[]>("/books/top-rated")
}

export function getBookById(id: string) {
  return apiFetch<Book>(`/books/${id}`)
}