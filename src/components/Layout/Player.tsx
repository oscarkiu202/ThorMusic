import { useRef, useEffect, useState } from 'react'
import { usePlayerStore } from '../../hooks/usePlayer'
import { tracksService } from '../../services/tracks'

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function Player() {
  const { currentTrack, isPlaying, nextTrack, prevTrack, togglePlay } = usePlayerStore()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const listenRegistered = useRef<number | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    audio.src = currentTrack.stream_url
    audio.volume = volume
    audio.play().catch(() => {})

    if (listenRegistered.current !== currentTrack.id) {
      listenRegistered.current = currentTrack.id
      tracksService.registerListen(currentTrack.id).catch(() => {})
    }
  }, [currentTrack])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime)
  }
  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration)
  }
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value)
    setCurrentTime(t)
    if (audioRef.current) audioRef.current.currentTime = t
  }

  if (!currentTrack) return null

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-thor-surface/95 backdrop-blur-xl border-t border-thor-border z-50 flex items-center px-6 gap-6">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextTrack}
      />

      {/* Track info */}
      <div className="flex items-center gap-4 w-72 flex-shrink-0">
        <div className="relative flex-shrink-0">
          <img
            src={currentTrack.cover_art_url}
            alt={currentTrack.title}
            className="w-12 h-12 rounded-lg object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/48x48/7c3aed/fff?text=♪' }}
          />
          {isPlaying && (
            <div className="absolute inset-0 rounded-lg border-2 border-thor-accent animate-pulse-slow" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-thor-text font-body font-medium text-sm truncate">{currentTrack.title}</p>
          <p className="text-thor-muted font-body text-xs truncate">{currentTrack.artist_name}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col items-center gap-2">
        <div className="flex items-center gap-6">
          <button
            onClick={prevTrack}
            className="text-thor-muted hover:text-thor-text transition-colors"
          >
            ⏮
          </button>
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-thor-accent hover:bg-thor-accent-bright text-white flex items-center justify-center transition-all hover:scale-105 shadow-lg shadow-thor-accent-glow"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            onClick={nextTrack}
            className="text-thor-muted hover:text-thor-text transition-colors"
          >
            ⏭
          </button>
        </div>

        <div className="flex items-center gap-3 w-full max-w-lg">
          <span className="text-thor-muted text-xs font-mono w-10 text-right">{formatTime(currentTime)}</span>
          <div className="flex-1 relative h-1 bg-thor-border rounded-full group cursor-pointer">
            <div
              className="absolute left-0 top-0 h-full bg-thor-accent rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
          <span className="text-thor-muted text-xs font-mono w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 w-36 flex-shrink-0">
        <span className="text-thor-muted text-sm">🔊</span>
        <div className="flex-1 relative h-1 bg-thor-border rounded-full">
          <div
            className="absolute left-0 top-0 h-full bg-thor-muted rounded-full"
            style={{ width: `${volume * 100}%` }}
          />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}
