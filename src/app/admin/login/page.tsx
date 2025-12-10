'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Credenciales inválidas')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (err) {
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Panel izquierdo - branding y hero admin */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-2xl shadow-black/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.18),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_25%)]" />
          <div className="relative p-10 h-full flex flex-col justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl border border-white/20 bg-white/10 backdrop-blur flex items-center justify-center text-white text-lg font-semibold tracking-[0.08em]">
                M
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-300/80">Panel</p>
                <h1 className="text-2xl font-semibold text-white leading-tight">MeleRoller Admin</h1>
                <p className="text-slate-300 text-sm">Cortinas y Cerramientos</p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-white">Gestioná todo desde un lugar</h2>
              <ul className="space-y-2 text-slate-200/90 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400" />
                  Configurá el hero y banners en minutos.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-sky-400" />
                  Administra solicitudes y presupuestos.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-indigo-400" />
                  Mantén consistencia visual del sitio.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4 text-slate-100 text-sm leading-relaxed">
              <p className="font-semibold text-white mb-1">Acceso rápido</p>
              <p>Usá las credenciales de demo para probar el panel.</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                  <p className="text-slate-200/80">Email</p>
                  <code className="text-white font-semibold">admin@meleroller.com.ar</code>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                  <p className="text-slate-200/80">Password</p>
                  <code className="text-white font-semibold">admin123</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho - formulario */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="px-8 pt-8 pb-2">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">Acceso</p>
            <h2 className="text-2xl font-semibold text-slate-900 mt-1">Inicia sesión</h2>
            <p className="text-slate-500 text-sm">Accedé al panel de administración</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-8 pt-4 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-slate-900"
                  placeholder="admin@meleroller.com.ar"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-slate-900"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-100"
              >
                <AlertCircle size={18} />
                <span className="text-sm font-medium">{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Ingresando...
                </>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
