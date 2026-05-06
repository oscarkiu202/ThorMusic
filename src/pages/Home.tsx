import { useState, useEffect, useCallback } from 'react'
import { tracksService } from '../services/tracks'
import { playlistsService } from '../services/playlists'
import { TrackList } from '../components/Tracks/TrackList'
import { useAuth } from '../context/AuthContext'
import type { Track, Playlist } from '../types'

interface AddToPlaylistModalProps {
  track: Track
  playlists: Playlist[]
  onClose: () => void
  onAdded: () => void
}

function AddToPlaylistModal({ track, playlists, onClose, onAdded }: AddToPlaylistModalProps) {
  const handleAdd = async (playlistId: number) => {
    await playlistsService.addTrack(playlistId, track.id)
    onAdded()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-thor-surface border border-thor-border rounded-2xl p-6 w-80 shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-thor-text">Agregar a playlist</h3>
          <button onClick={onClose} className="text-thor-muted hover:text-thor-text">✕</button>
        </div>
        <p className="text-thor-muted font-body text-sm mb-4 truncate">"{track.title}"</p>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {playlists.length === 0 && (
            <p className="text-thor-subtle font-body text-sm text-center py-4">No tienes playlists aún</p>
          )}
          {playlists.map((pl) => (
            <button
              key={pl.id}
              onClick={() => handleAdd(pl.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-thor-card border border-transparent hover:border-thor-border transition-all text-left"
            >
              <div className="w-9 h-9 rounded-lg bg-thor-accent/20 border border-thor-accent/30 flex items-center justify-center flex-shrink-0">
                <span className="text-sm">🎵</span>
              </div>
              <div className="min-w-0">
                <p className="font-body font-medium text-thor-text text-sm truncate">{pl.name}</p>
                <p className="text-thor-muted text-xs font-body">{pl.tracks_count} canciones</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Home() {
  const { user } = useAuth()
  const [tracks, setTracks] = useState<Track[]>([])
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

  useEffect(() => {
    Promise.all([
      tracksService.getPopular(50).then(setTracks),
      user ? playlistsService.getMine().then(setPlaylists) : Promise.resolve(),
    ]).finally(() => setLoading(false))
  }, [user])

  const handleAddToPlaylist = useCallback((track: Track) => {
    setSelectedTrack(track)
  }, [])

  if (loading) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-thor-accent border-t-transparent animate-spin" />
    </div>
  )

  return (
    <div className="flex-1 overflow-y-auto pb-24 animate-fade-in">
      {selectedTrack && (
        <AddToPlaylistModal
          track={selectedTrack}
          playlists={playlists}
          onClose={() => setSelectedTrack(null)}
          onAdded={() => {}}
        />
      )}

      <div className="px-8 py-8">
        {/* Hero */}
        <div className="mb-10">
          <p className="text-thor-muted font-body text-sm mb-2">
            {new Date().getHours() < 12 ? '🌅 Buenos días' : new Date().getHours() < 18 ? '☀️ Buenas tardes' : '🌙 Buenas noches'},
            {' '}<span className="text-thor-accent font-medium">{user?.username}</span>
          </p>
          <h1 className="font-display font-bold text-4xl text-thor-text tracking-tight">
            Canciones populares
          </h1>
        </div>

        {/* Track list */}
        <TrackList
          tracks={tracks}
          onAddToPlaylist={handleAddToPlaylist}
          showAddButton={!!user}
        />
      </div>
    </div>
  )
}
