import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { playlistsService } from '../../services/playlists'
import { TrackList } from '../Tracks/TrackList'
import { usePlayerStore } from '../../hooks/usePlayer'
import type { Playlist, Track } from '../../types'

interface AddToPlaylistModalProps {
  track: Track
  onClose: () => void
  playlistId: number
  onAdded: () => void
}

function AddToPlaylistConfirm({ track, onClose, playlistId, onAdded }: AddToPlaylistModalProps) {
  const handleAdd = async () => {
    await playlistsService.addTrack(playlistId, track.id)
    onAdded()
    onClose()
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-thor-surface border border-thor-border rounded-2xl p-6 w-80 shadow-2xl">
        <p className="font-body text-thor-text mb-4">¿Agregar <strong>{track.title}</strong> a esta playlist?</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 bg-thor-card border border-thor-border text-thor-muted py-2 rounded-xl font-body text-sm transition-all hover:text-thor-text">Cancelar</button>
          <button onClick={handleAdd} className="flex-1 bg-thor-accent text-white py-2 rounded-xl font-body font-medium text-sm hover:bg-thor-accent-bright transition-all">Agregar</button>
        </div>
      </div>
    </div>
  )
}

export function PlaylistDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [playlist, setPlaylist] = useState<Playlist | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
  const { setTrack } = usePlayerStore()

  const load = async () => {
    if (!id) return
    try {
      const data = await playlistsService.getById(Number(id))
      setPlaylist(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [id])

  const handleRemoveTrack = async (trackId: number) => {
    if (!id) return
    await playlistsService.removeTrack(Number(id), trackId)
    load()
  }

  const handlePlayAll = () => {
    if (playlist?.tracks?.[0]) setTrack(playlist.tracks[0], playlist.tracks)
  }

  const handleDelete = async () => {
    if (!id || !window.confirm('¿Eliminar esta playlist?')) return
    await playlistsService.delete(Number(id))
    navigate('/library')
  }

  if (loading) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-thor-accent border-t-transparent animate-spin" />
    </div>
  )

  if (!playlist) return (
    <div className="flex-1 flex items-center justify-center text-thor-muted font-body">Playlist no encontrada</div>
  )

  return (
    <div className="flex-1 overflow-y-auto pb-24">
      {selectedTrack && (
        <AddToPlaylistConfirm
          track={selectedTrack}
          playlistId={Number(id)}
          onClose={() => setSelectedTrack(null)}
          onAdded={load}
        />
      )}

      {/* Header */}
      <div className="px-8 py-8 bg-gradient-to-b from-thor-accent/20 to-transparent">
        <div className="flex items-end gap-6">
          <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-thor-accent/40 to-thor-bg border border-thor-border flex items-center justify-center flex-shrink-0 shadow-2xl">
            {playlist.cover_art ? (
              <img src={playlist.cover_art} alt={playlist.name} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <span className="text-6xl opacity-50">🎵</span>
            )}
          </div>
          <div className="flex-1 min-w-0 pb-2">
            <p className="text-xs font-body font-semibold text-thor-muted uppercase tracking-widest mb-2">Playlist</p>
            <h1 className="font-display font-bold text-4xl text-thor-text mb-2 leading-tight">{playlist.name}</h1>
            {playlist.description && (
              <p className="text-thor-muted font-body text-sm mb-3">{playlist.description}</p>
            )}
            <p className="text-thor-subtle font-body text-sm">
              {playlist.owner_name} · {playlist.tracks_count} canciones
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handlePlayAll}
            disabled={!playlist.tracks?.length}
            className="w-14 h-14 rounded-full bg-thor-accent text-white text-xl flex items-center justify-center hover:bg-thor-accent-bright transition-all hover:scale-105 shadow-lg shadow-thor-accent-glow disabled:opacity-50"
          >
            ▶
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 font-body text-sm transition-all"
          >
            🗑 Eliminar
          </button>
        </div>
      </div>

      {/* Tracks */}
      <div className="px-8 mt-4">
        {playlist.tracks && playlist.tracks.length > 0 ? (
          <div className="space-y-1">
            {playlist.tracks.map((track, i) => (
              <div key={track.id} className="group flex items-center gap-2">
                <div className="flex-1">
                  <TrackList tracks={[track]} />
                </div>
                <button
                  onClick={() => handleRemoveTrack(track.id)}
                  className="opacity-0 group-hover:opacity-100 flex-shrink-0 text-thor-subtle hover:text-red-400 text-sm transition-all px-2 py-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🎵</p>
            <p className="text-thor-muted font-body">Esta playlist está vacía</p>
            <p className="text-thor-subtle font-body text-sm mt-1">Ve al inicio o búsqueda para agregar canciones</p>
          </div>
        )}
      </div>
    </div>
  )
}
