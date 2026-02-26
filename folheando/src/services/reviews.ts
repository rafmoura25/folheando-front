import { apiFetch } from "../lib/api"

export function createReview(
  bookId: string,
  rating: number,
  comment: string
) {
  return apiFetch("/reviews", {
    method: "POST",
    body: JSON.stringify({
      bookId,
      rating,
      comment,
    }),
  })
}