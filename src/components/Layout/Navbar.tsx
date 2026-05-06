import { useNavigate } from 'react-router-dom'

interface NavbarProps {
  onSearch?: (q: string) => void
  showSearch?: boolean
}

export function Navbar({ onSearch, showSearch }: NavbarProps) {
  const navigate = useNavigate()

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-thor-bg/80 backdrop-blur-md sticky top-0 z-40 border-b border-thor-border/50">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-thor-card border border-thor-border text-thor-muted hover:text-thor-text flex items-center justify-center transition-all text-sm"
        >
          ←
        </button>
        <button
          onClick={() => navigate(1)}
          className="w-8 h-8 rounded-full bg-thor-card border border-thor-border text-thor-muted hover:text-thor-text flex items-center justify-center transition-all text-sm"
        >
          →
        </button>
      </div>

      {showSearch && (
        <div className="flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Buscar canciones, artistas..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full bg-thor-card border border-thor-border rounded-full px-5 py-2.5 text-thor-text font-body text-sm placeholder-thor-subtle focus:outline-none focus:border-thor-accent focus:ring-1 focus:ring-thor-accent transition-all"
          />
        </div>
      )}

      <div className="w-24" />
    </header>
  )
}
