import { useState, useCallback } from 'react'
import { tracksService } from '../services/tracks'
import { playlistsService } from '../services/playlists'
import { SearchBar } from '../components/Tracks/SearchBar'
import { TrackList } from '../components/Tracks/TrackList'
import { useAuth } from '../context/AuthContext'
import type { Track, Playlist } from '../types'

export function Search() {
  const { user } = useAuth()
  const [tracks, setTracks] = useState<Track[]>([])
  const [playlists] = useState<Playlist[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = useCallback(async (q: string) => {
    setQuery(q)
    if (!q.trim()) {
      setTracks([])
      setSearched(false)
      return
    }
    setLoading(true)
    setSearched(true)
    try {
      const results = await tracksService.search(q)
      setTracks(results)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleAddToPlaylist = useCallback(async (track: Track) => {
    if (playlists.length === 0) {
      alert('No tienes playlists. Crea una desde la Biblioteca.')
      return
    }
    const pl = playlists[0]
    await playlistsService.addTrack(pl.id, track.id)
    alert(`"${track.title}" agregada a ${pl.name}`)
  }, [playlists])

  const genres = ['Dubstep', 'Electronic', 'Rock', 'Hip-Hop', 'Jazz', 'Indie', 'Pop', 'Techno', 'House', 'Ambient']

  return (
    <div className="flex-1 overflow-y-auto pb-24 animate-fade-in">
      <div className="px-8 py-8">
        <h1 className="font-display font-bold text-4xl text-thor-text mb-8 tracking-tight">Buscar</h1>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {!searched && (
          <div>
            <h2 className="font-display font-semibold text-xl text-thor-text mb-4">Explorar géneros</h2>
            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleSearch(genre)}
                  className="px-5 py-2.5 bg-thor-card border border-thor-border rounded-xl text-thor-muted hover:text-thor-accent hover:border-thor-accent font-body font-medium text-sm transition-all"
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 rounded-full border-2 border-thor-accent border-t-transparent animate-spin" />
          </div>
        )}

        {searched && !loading && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-xl text-thor-text">
                {tracks.length > 0 ? `${tracks.length} resultados para "${query}"` : `Sin resultados para "${query}"`}
              </h2>
            </div>
            {tracks.length > 0 ? (
              <TrackList tracks={tracks} onAddToPlaylist={handleAddToPlaylist} showAddButton={!!user} />
            ) : (
              <div className="text-center py-16">
                <p className="text-5xl mb-4">🎵</p>
                <p className="text-thor-muted font-body">Intenta con otros términos de búsqueda</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
