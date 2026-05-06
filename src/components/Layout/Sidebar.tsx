import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface SidebarProps {
  playlists?: { id: number; name: string }[]
  onCreatePlaylist?: () => void
}

const navItems = [
  { to: '/', label: 'Inicio', icon: '⚡' },
  { to: '/search', label: 'Buscar', icon: '🔍' },
  { to: '/library', label: 'Mi Biblioteca', icon: '📚' },
]

export function Sidebar({ playlists = [], onCreatePlaylist }: SidebarProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-thor-surface border-r border-thor-border flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-thor-accent flex items-center justify-center animate-glow">
            <span className="text-white font-display font-bold">T</span>
          </div>
          <span className="font-display font-bold text-xl text-thor-text tracking-tight">Thor Music</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="px-3 mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 font-body font-medium text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-thor-accent/20 text-thor-accent-bright border border-thor-accent/30'
                  : 'text-thor-muted hover:text-thor-text hover:bg-thor-card'
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        {user?.is_admin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 font-body font-medium text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-thor-gold/20 text-thor-gold border border-thor-gold/30'
                  : 'text-thor-muted hover:text-thor-text hover:bg-thor-card'
              }`
            }
          >
            <span className="text-base">⚙️</span>
            Panel Admin
          </NavLink>
        )}
      </nav>

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto px-3 mt-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <span className="text-xs font-body font-semibold text-thor-subtle uppercase tracking-widest">Playlists</span>
          <button
            onClick={onCreatePlaylist}
            className="w-6 h-6 rounded-lg bg-thor-card border border-thor-border text-thor-muted hover:text-thor-accent hover:border-thor-accent flex items-center justify-center text-xs transition-all"
          >
            +
          </button>
        </div>
        <div className="space-y-0.5">
          {playlists.map((pl) => (
            <NavLink
              key={pl.id}
              to={`/playlist/${pl.id}`}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-body transition-all truncate ${
                  isActive
                    ? 'text-thor-accent-bright bg-thor-accent/10'
                    : 'text-thor-muted hover:text-thor-text hover:bg-thor-card'
                }`
              }
            >
              {pl.name}
            </NavLink>
          ))}
          {playlists.length === 0 && (
            <p className="px-4 py-2 text-xs font-body text-thor-subtle italic">
              Aún no hay playlists
            </p>
          )}
        </div>
      </div>

      {/* User */}
      <div className="p-4 border-t border-thor-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-thor-card transition-all group">
          <div className="w-8 h-8 rounded-full bg-thor-accent/30 border border-thor-accent/50 flex items-center justify-center flex-shrink-0">
            <span className="text-thor-accent font-display font-bold text-sm">
              {user?.username?.[0]?.toUpperCase() || '?'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-thor-text font-body font-medium text-sm truncate">{user?.username}</p>
            {user?.is_admin && (
              <p className="text-thor-gold text-xs font-mono">admin</p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="opacity-0 group-hover:opacity-100 text-thor-muted hover:text-red-400 text-xs font-body transition-all"
          >
            Salir
          </button>
        </div>
      </div>
    </aside>
  )
}
