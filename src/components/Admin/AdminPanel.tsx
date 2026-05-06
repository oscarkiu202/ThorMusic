import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import type { AdminStats, User } from '../../types'

export function AdminPanel() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState('')

  useEffect(() => {
    Promise.all([
      api.get<AdminStats>('/admin/stats').then((r) => setStats(r.data)),
      api.get<User[]>('/admin/users').then((r) => setUsers(r.data)),
    ]).finally(() => setLoading(false))
  }, [])

  const toggleAdmin = async (userId: number) => {
    await api.put(`/admin/users/${userId}/toggle-admin`)
    const r = await api.get<User[]>('/admin/users')
    setUsers(r.data)
  }

  const toggleActive = async (userId: number) => {
    await api.put(`/admin/users/${userId}/toggle-active`)
    const r = await api.get<User[]>('/admin/users')
    setUsers(r.data)
  }

  const handleSync = async () => {
    setSyncing(true)
    setSyncMsg('')
    try {
      await api.post('/tracks/sync')
      setSyncMsg('✅ Sincronización iniciada en segundo plano')
    } catch {
      setSyncMsg('❌ Error al sincronizar')
    } finally {
      setSyncing(false)
    }
  }

  if (loading) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-thor-gold border-t-transparent animate-spin" />
    </div>
  )

  return (
    <div className="flex-1 overflow-y-auto pb-24 px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">⚙️</span>
          <h1 className="font-display font-bold text-3xl text-thor-text">Panel de Administración</h1>
        </div>
        <p className="text-thor-muted font-body text-sm">Gestión y estadísticas del sistema</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Usuarios', value: stats.total_users, icon: '👤', color: 'from-blue-500/20 to-blue-600/5' },
            { label: 'Canciones', value: stats.total_tracks, icon: '🎵', color: 'from-thor-accent/20 to-thor-accent/5' },
            { label: 'Playlists', value: stats.total_playlists, icon: '📚', color: 'from-green-500/20 to-green-600/5' },
            { label: 'Escuchas', value: stats.total_listening_history, icon: '👂', color: 'from-thor-gold/20 to-thor-gold/5' },
          ].map((stat) => (
            <div key={stat.label} className={`bg-gradient-to-br ${stat.color} border border-thor-border rounded-2xl p-5`}>
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="font-display font-bold text-3xl text-thor-text">{stat.value.toLocaleString()}</div>
              <div className="text-thor-muted font-body text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Sync */}
      <div className="bg-thor-card border border-thor-border rounded-2xl p-5 mb-8 flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-thor-text mb-1">Sincronizar con Audius</h3>
          <p className="text-thor-muted font-body text-sm">Importar nuevas canciones desde la plataforma</p>
          {syncMsg && <p className="text-sm font-body mt-2">{syncMsg}</p>}
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="px-5 py-2.5 bg-thor-gold/20 border border-thor-gold/40 text-thor-gold rounded-xl font-body font-medium text-sm hover:bg-thor-gold/30 transition-all disabled:opacity-50"
        >
          {syncing ? 'Sincronizando...' : '⚡ Sincronizar'}
        </button>
      </div>

      {/* Users */}
      <div className="bg-thor-card border border-thor-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-thor-border">
          <h2 className="font-display font-semibold text-thor-text">Usuarios ({users.length})</h2>
        </div>
        <div className="divide-y divide-thor-border">
          {users.map((u) => (
            <div key={u.id} className="flex items-center gap-4 px-6 py-4 hover:bg-thor-surface/50 transition-all">
              <div className="w-9 h-9 rounded-full bg-thor-accent/20 border border-thor-accent/40 flex items-center justify-center flex-shrink-0">
                <span className="text-thor-accent font-display font-bold text-sm">{u.username[0]?.toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-body font-medium text-thor-text text-sm">{u.username}</p>
                  {u.is_admin && <span className="text-xs bg-thor-gold/20 text-thor-gold border border-thor-gold/30 px-2 py-0.5 rounded-full font-mono">admin</span>}
                  {!u.is_active && <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-mono">inactivo</span>}
                </div>
                <p className="text-thor-muted font-body text-xs">{u.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleAdmin(u.id)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-thor-border text-thor-muted hover:text-thor-gold hover:border-thor-gold/50 font-body transition-all"
                >
                  {u.is_admin ? 'Quitar admin' : 'Dar admin'}
                </button>
                <button
                  onClick={() => toggleActive(u.id)}
                  className="text-xs px-3 py-1.5 rounded-lg border border-thor-border text-thor-muted hover:text-red-400 hover:border-red-500/50 font-body transition-all"
                >
                  {u.is_active ? 'Desactivar' : 'Activar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
