import { useState, useEffect } from 'react'
import { playlistsService } from '../services/playlists'
import { PlaylistCard } from '../components/Playlists/PlaylistCard'
import { CreatePlaylistModal } from '../components/Playlists/CreatePlaylistModal'
import type { Playlist } from '../types'

export function Library() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)

  const load = async () => {
    try {
      const data = await playlistsService.getMine()
      setPlaylists(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar esta playlist?')) return
    await playlistsService.delete(id)
    setPlaylists((prev) => prev.filter((p) => p.id !== id))
  }

  if (loading) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-thor-accent border-t-transparent animate-spin" />
    </div>
  )

  return (
    <div className="flex-1 overflow-y-auto pb-24 animate-fade-in">
      {showCreate && (
        <CreatePlaylistModal
          onClose={() => setShowCreate(false)}
          onCreate={(pl) => setPlaylists((prev) => [pl, ...prev])}
        />
      )}

      <div className="px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display font-bold text-4xl text-thor-text tracking-tight">Mi Biblioteca</h1>
          <button
            onClick={() => setShowCreate(true)}
            className="px-5 py-2.5 bg-thor-accent hover:bg-thor-accent-bright text-white font-body font-medium text-sm rounded-xl transition-all hover:shadow-lg hover:shadow-thor-accent-glow"
          >
            + Nueva Playlist
          </button>
        </div>

        {playlists.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-6">📚</p>
            <h2 className="font-display font-bold text-2xl text-thor-text mb-3">Tu biblioteca está vacía</h2>
            <p className="text-thor-muted font-body mb-6">Crea tu primera playlist para empezar</p>
            <button
              onClick={() => setShowCreate(true)}
              className="px-6 py-3 bg-thor-accent hover:bg-thor-accent-bright text-white font-body font-medium rounded-xl transition-all"
            >
              Crear playlist
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {playlists.map((pl) => (
              <PlaylistCard key={pl.id} playlist={pl} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
