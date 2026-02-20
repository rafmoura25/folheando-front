import { books } from "../data/books"
import type { Book } from "../types/book"

export function getBooks(): Promise<Book[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books)
    }, 500)
  })
}

export function getBookById(id: string): Promise<Book | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books.find((book) => book.id === id))
    }, 500)
  })
}