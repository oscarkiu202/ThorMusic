import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const perks = [
  'Acceso inmediato a tu biblioteca',
  'Diseño profesional y oscuro',
  'Registro rápido y seguro',
]

export function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(email, username, password)
      navigate('/')
    } catch {
      setError('Error al registrar. El email o usuario ya puede estar en uso.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-thor-bg flex items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#07090f] via-[#090c14] to-[#07070b] p-10 shadow-glow-backdrop">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(29,185,84,0.24),transparent_22%)] pointer-events-none" />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-3 rounded-3xl bg-thor-card/80 px-4 py-3 mb-8 border border-white/10 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-thor-accent text-black font-display font-bold text-lg">
                  T
                </div>
                <div>
                  <p className="text-thor-muted text-sm">Únete a</p>
                  <h1 className="text-4xl font-display font-semibold text-thor-text tracking-tight">Thorify Pro</h1>
                </div>
              </div>

              <p className="max-w-md text-thor-muted leading-8">
                Regístrate rápidamente y comienza a construir tu colección musical con un diseño elegante, controles fluidos y una experiencia premium.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {perks.map((perk) => (
                <div key={perk} className="flex items-start gap-3 rounded-3xl border border-white/10 bg-thor-card/80 p-4 shadow-sm">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-thor-accent text-black text-lg">★</span>
                  <p className="text-thor-text font-body text-sm leading-6">{perk}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-thor-surface/95 p-10 shadow-glow-backdrop">
          <div className="absolute -right-16 top-8 h-40 w-40 rounded-full bg-thor-accent/15 blur-3xl" />
          <div className="relative">
            <div className="mb-8">
              <p className="text-thor-accent uppercase tracking-[0.32em] text-xs font-semibold mb-3">Registro</p>
              <h2 className="text-3xl font-display font-semibold text-thor-text tracking-tight">
                Crea tu cuenta premium
              </h2>
              <p className="mt-3 text-thor-muted leading-7">
                Completa tus datos y accede a una aplicación con estilo profesional y moderna.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5">
                <label className="space-y-2 text-sm font-medium text-thor-muted">
                  Nombre de usuario
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="tuusuario"
                    required
                    className="w-full rounded-3xl border border-white/10 bg-thor-card/90 px-5 py-4 text-thor-text placeholder-thor-subtle outline-none focus:border-thor-accent focus:ring-2 focus:ring-thor-accent/20 transition"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-thor-muted">
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full rounded-3xl border border-white/10 bg-thor-card/90 px-5 py-4 text-thor-text placeholder-thor-subtle outline-none focus:border-thor-accent focus:ring-2 focus:ring-thor-accent/20 transition"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-thor-muted">
                  Contraseña
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full rounded-3xl border border-white/10 bg-thor-card/90 px-5 py-4 text-thor-text placeholder-thor-subtle outline-none focus:border-thor-accent focus:ring-2 focus:ring-thor-accent/20 transition"
                  />
                </label>
              </div>

              {error && (
                <div className="rounded-3xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-3xl bg-thor-accent px-5 py-4 text-base font-semibold text-black shadow-lg shadow-thor-accent-glow transition duration-200 hover:bg-thor-accent-bright disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </button>
            </form>

            <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-thor-muted">
              <p>
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="text-thor-accent hover:text-thor-accent-bright font-semibold">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
