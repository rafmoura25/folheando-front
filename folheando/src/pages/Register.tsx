import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"

export default function Register() {
    const { register } = useAuth()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")
        setIsLoading(true)
        try {
            await register(name, email, password)
            navigate("/")
        } catch (err: any) {
            setError(err.message || "Erro ao criar conta. Tente novamente.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                    {/* Header com tema navy */}
                    <div
                        className="px-8 pt-10 pb-8 text-center"
                        style={{ background: "linear-gradient(135deg, #0B1B3A 60%, #1e3a6e)" }}
                    >
                        <div className="text-4xl mb-3">📚</div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">
                            Crie sua conta
                        </h1>
                        <p className="text-pink-200 text-sm mt-1">
                            Junte-se à comunidade Folheando
                        </p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8">
                        {error && (
                            <div className="mb-5 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                                <span>⚠️</span>
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Nome */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    placeholder="Seu nome completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1B3A] focus:border-transparent transition"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1B3A] focus:border-transparent transition"
                                />
                            </div>

                            {/* Senha */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Senha
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-xs text-gray-400 hover:text-gray-600 transition"
                                    >
                                        {showPassword ? "Ocultar" : "Mostrar"}
                                    </button>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1B3A] focus:border-transparent transition"
                                />
                            </div>

                            {/* Botão de cadastro */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                style={{
                                    background: isLoading
                                        ? "#64748B"
                                        : "linear-gradient(135deg, #0B1B3A, #1e3a6e)",
                                    color: "white",
                                }}
                            >
                                {isLoading ? "Criando conta..." : "Criar conta"}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center gap-3">
                            <div className="flex-1 h-px bg-gray-200" />
                            <span className="text-xs text-gray-400">ou</span>
                            <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        {/* Link para login */}
                        <p className="text-center text-sm text-gray-500">
                            Já tem uma conta?{" "}
                            <Link
                                to="/login"
                                className="font-semibold hover:underline transition"
                                style={{ color: "#0B1B3A" }}
                            >
                                Fazer login
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Below card note */}
                <p className="text-center text-xs text-gray-400 mt-6">
                    Ao continuar, você concorda com os nossos termos de uso.
                </p>
            </div>
        </div>
    )
}