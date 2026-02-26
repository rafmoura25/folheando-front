import { apiFetch } from "../lib/api"

export interface TopUser {
  id: string
  name: string
  totalReviews: number
}

export function getTopReviewers() {
  return apiFetch<TopUser[]>("/users/top-reviewers")
}