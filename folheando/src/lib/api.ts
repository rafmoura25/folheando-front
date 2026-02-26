const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"
if (!import.meta.env.VITE_API_URL) {
  console.warn("[api] VITE_API_URL não definido — usando http://localhost:3000")
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erro na requisição")
  }

  return response.json()
}