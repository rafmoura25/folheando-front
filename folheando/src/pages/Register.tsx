import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function Register() {
    const { register } = useAuth()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        try {
            await register(name, email, password)
            navigate("/")
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6">Criar Conta</h1>

            {error && (
                <p className="text-red-500 mb-4">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    className="w-full border p-3 rounded-lg"
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="w-full border p-3 rounded-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full border p-3 rounded-lg"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                >
                    Criar Conta
                </button>
            </form>

            <p className="mt-4 text-sm text-center">
                Já possui conta?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Faça login
                </Link>
            </p>
        </div>
    )
}