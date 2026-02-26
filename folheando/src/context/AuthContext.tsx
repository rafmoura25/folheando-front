import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"
import * as authService from "../services/auth"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  async function login(email: string, password: string) {
    const data = await authService.login(email, password)

    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data.user))

    setUser(data.user)
  }

  async function register(
    name: string,
    email: string,
    password: string
  ) {
    const data = await authService.register(name, email, password)

    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data.user))

    setUser(data.user)
  }

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}