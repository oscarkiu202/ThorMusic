import type { Track } from '../../types'
import { TrackCard } from './TrackCard'

interface TrackListProps {
  tracks: Track[]
  onAddToPlaylist?: (track: Track) => void
  showAddButton?: boolean
}

export function TrackList({ tracks, onAddToPlaylist, showAddButton }: TrackListProps) {
  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-2 text-xs font-body font-semibold text-thor-subtle uppercase tracking-widest border-b border-thor-border mb-2">
        <span className="w-8">#</span>
        <span className="w-10 flex-shrink-0" />
        <span className="flex-1">Título</span>
        <span className="hidden md:block w-28">Género</span>
        <span className="w-10 text-right">Dur.</span>
        {showAddButton && <span className="w-7" />}
      </div>

      {tracks.map((track, i) => (
        <TrackCard
          key={track.id}
          track={track}
          queue={tracks}
          index={i}
          onAddToPlaylist={onAddToPlaylist}
          showAddButton={showAddButton}
        />
      ))}
    </div>
  )
}
