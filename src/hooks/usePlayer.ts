import { create } from 'zustand'
import type { Track } from '../types'

interface PlayerState {
  currentTrack: Track | null
  queue: Track[]
  isPlaying: boolean
  setTrack: (track: Track, queue?: Track[]) => void
  togglePlay: () => void
  nextTrack: () => void
  prevTrack: () => void
  clearPlayer: () => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,

  setTrack: (track, queue = []) => {
    set({ currentTrack: track, queue, isPlaying: true })
  },

  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),

  nextTrack: () => {
    const { queue, currentTrack } = get()
    if (!currentTrack || queue.length === 0) return
    const idx = queue.findIndex((t) => t.id === currentTrack.id)
    const next = queue[idx + 1]
    if (next) set({ currentTrack: next, isPlaying: true })
  },

  prevTrack: () => {
    const { queue, currentTrack } = get()
    if (!currentTrack || queue.length === 0) return
    const idx = queue.findIndex((t) => t.id === currentTrack.id)
    const prev = queue[idx - 1]
    if (prev) set({ currentTrack: prev, isPlaying: true })
  },

  clearPlayer: () => set({ currentTrack: null, queue: [], isPlaying: false }),
}))
