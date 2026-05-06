import type { Track } from '../../types'
import { usePlayerStore } from '../../hooks/usePlayer'

interface TrackCardProps {
  track: Track
  queue?: Track[]
  onAddToPlaylist?: (track: Track) => void
  showAddButton?: boolean
  index?: number
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function TrackCard({ track, queue = [], onAddToPlaylist, showAddButton, index }: TrackCardProps) {
  const { setTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore()
  const isCurrentTrack = currentTrack?.id === track.id

  const handlePlay = () => {
    if (isCurrentTrack) {
      togglePlay()
    } else {
      setTrack(track, queue)
    }
  }

  return (
    <div
      className={`group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-150 cursor-pointer ${
        isCurrentTrack
          ? 'bg-thor-accent/10 border border-thor-accent/30'
          : 'hover:bg-thor-card border border-transparent'
      }`}
    >
      {/* Index / Play button */}
      <div className="w-8 flex-shrink-0 flex items-center justify-center">
        <span className={`font-mono text-sm group-hover:hidden ${isCurrentTrack ? 'hidden' : 'block'} text-thor-subtle`}>
          {index !== undefined ? index + 1 : ''}
        </span>
        <button
          onClick={handlePlay}
          className={`${isCurrentTrack ? 'flex' : 'hidden group-hover:flex'} w-7 h-7 items-center justify-center text-white`}
        >
          {isCurrentTrack && isPlaying ? '⏸' : '▶'}
        </button>
      </div>

      {/* Cover */}
      <div className="relative flex-shrink-0">
        <img
          src={track.cover_art_url}
          alt={track.title}
          className="w-10 h-10 rounded-lg object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/40x40/7c3aed/fff?text=♪' }}
        />
        {isCurrentTrack && isPlaying && (
          <div className="absolute inset-0 rounded-lg flex items-center justify-center bg-black/40">
            <span className="text-white text-xs animate-pulse">♪</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`font-body font-medium text-sm truncate ${isCurrentTrack ? 'text-thor-accent-bright' : 'text-thor-text'}`}>
          {track.title}
        </p>
        <p className="text-thor-muted font-body text-xs truncate">{track.artist_name}</p>
      </div>

      {/* Genre */}
      <span className="hidden md:block text-xs font-body text-thor-subtle bg-thor-card px-3 py-1 rounded-full border border-thor-border">
        {track.genre}
      </span>

      {/* Duration */}
      <span className="text-xs font-mono text-thor-muted w-10 text-right flex-shrink-0">
        {formatDuration(track.duration)}
      </span>

      {/* Add to playlist */}
      {showAddButton && onAddToPlaylist && (
        <button
          onClick={(e) => { e.stopPropagation(); onAddToPlaylist(track) }}
          className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg bg-thor-card border border-thor-border text-thor-muted hover:text-thor-accent hover:border-thor-accent flex items-center justify-center text-xs transition-all"
        >
          +
        </button>
      )}
    </div>
  )
}
