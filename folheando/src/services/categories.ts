import { apiFetch } from "../lib/api"

export interface Category {
  id: string
  name: string
}

export function getCategories() {
  return apiFetch<Category[]>("/categories")
}