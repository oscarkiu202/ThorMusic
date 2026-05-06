import { useState } from 'react'
import { playlistsService } from '../../services/playlists'
import type { Playlist } from '../../types'

interface CreatePlaylistModalProps {
  onClose: () => void
  onCreate: (playlist: Playlist) => void
}

export function CreatePlaylistModal({ onClose, onCreate }: CreatePlaylistModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    setError('')
    try {
      const pl = await playlistsService.create(name, description, isPublic)
      onCreate(pl)
      onClose()
    } catch {
      setError('Error al crear la playlist')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md mx-4 bg-thor-surface border border-thor-border rounded-2xl p-6 shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-thor-text">Nueva Playlist</h2>
          <button onClick={onClose} className="text-thor-muted hover:text-thor-text text-xl transition-colors">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-body font-medium text-thor-muted mb-2">Nombre *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mi playlist favorita"
              required
              className="w-full bg-thor-card border border-thor-border rounded-xl px-4 py-3 text-thor-text font-body placeholder-thor-subtle focus:outline-none focus:border-thor-accent focus:ring-1 focus:ring-thor-accent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-body font-medium text-thor-muted mb-2">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu playlist..."
              rows={3}
              className="w-full bg-thor-card border border-thor-border rounded-xl px-4 py-3 text-thor-text font-body placeholder-thor-subtle focus:outline-none focus:border-thor-accent focus:ring-1 focus:ring-thor-accent transition-all resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPublic(!isPublic)}
              className={`relative w-12 h-6 rounded-full transition-all duration-200 ${isPublic ? 'bg-thor-accent' : 'bg-thor-border'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${isPublic ? 'left-7' : 'left-1'}`} />
            </button>
            <span className="text-sm font-body text-thor-muted">
              {isPublic ? 'Playlist pública' : 'Playlist privada'}
            </span>
          </div>

          {error && (
            <p className="text-red-400 text-sm font-body">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-thor-card border border-thor-border text-thor-muted hover:text-thor-text font-body py-3 rounded-xl transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="flex-1 bg-thor-accent hover:bg-thor-accent-bright text-white font-display font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-thor-accent-glow"
            >
              {loading ? 'Creando...' : 'Crear Playlist'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
