import type { Book } from "../types/book"

export const books: Book[] = [
  {
    id: "1",
    title: "A Game of Thrones",
    author: "George R. R. Martin",
    description:
      "Primeiro livro da saga As Crônicas de Gelo e Fogo.",
    image: "/game-of-thrones.jpg",
    price: "R$ 20,00",
    categoryId: "fantasia",
  },
  {
    id: "2",
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    description:
      "Uma jornada épica pela Terra Média.",
    image: "/lord-of-the-rings.jpg",
    price: "R$ 25,00",
    categoryId: "fantasia",
  },
]