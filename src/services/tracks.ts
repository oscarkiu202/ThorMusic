import { api } from './api'
import type { Track } from '../types'

export const tracksService = {
  async getPopular(limit = 20): Promise<Track[]> {
    const { data } = await api.get<Track[]>(`/tracks/popular?limit=${limit}`)
    return data
  },

  async search(q: string): Promise<Track[]> {
    const { data } = await api.get<Track[]>(`/tracks/search?q=${encodeURIComponent(q)}`)
    return data
  },

  async getById(id: number): Promise<Track> {
    const { data } = await api.get<Track>(`/tracks/${id}`)
    return data
  },

  async registerListen(id: number): Promise<void> {
    await api.post(`/tracks/${id}/listen`)
  },

  async sync(): Promise<void> {
    await api.post('/tracks/sync')
  },
}
