import { useNavigate } from 'react-router-dom'
import type { Playlist } from '../../types'

interface PlaylistCardProps {
  playlist: Playlist
  onDelete?: (id: number) => void
}

export function PlaylistCard({ playlist, onDelete }: PlaylistCardProps) {
  const navigate = useNavigate()

  return (
    <div
      className="group bg-thor-card border border-thor-border rounded-2xl p-4 cursor-pointer hover:border-thor-accent/50 hover:bg-thor-surface transition-all duration-200 hover:shadow-lg hover:shadow-thor-accent-glow/20 animate-fade-in"
      onClick={() => navigate(`/playlist/${playlist.id}`)}
    >
      {/* Cover */}
      <div className="aspect-square rounded-xl mb-4 overflow-hidden relative bg-gradient-to-br from-thor-accent/30 to-thor-bg flex items-center justify-center">
        {playlist.cover_art ? (
          <img src={playlist.cover_art} alt={playlist.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl opacity-60">🎵</span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
        <button className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-thor-accent text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:bg-thor-accent-bright hover:scale-105">
          ▶
        </button>
      </div>

      {/* Info */}
      <div className="min-w-0">
        <p className="font-display font-semibold text-thor-text truncate mb-1">{playlist.name}</p>
        <p className="text-thor-muted text-xs font-body truncate mb-2">{playlist.description || 'Sin descripción'}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-body text-thor-subtle">{playlist.tracks_count} canciones</span>
          <div className="flex items-center gap-2">
            {playlist.is_public ? (
              <span className="text-xs bg-thor-accent/20 text-thor-accent border border-thor-accent/30 px-2 py-0.5 rounded-full font-body">Pública</span>
            ) : (
              <span className="text-xs bg-thor-subtle/20 text-thor-subtle border border-thor-subtle/30 px-2 py-0.5 rounded-full font-body">Privada</span>
            )}
            {onDelete && (
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(playlist.id) }}
                className="text-thor-subtle hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-all"
              >
                🗑
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
