import { api } from './api'
import type { Playlist } from '../types'

export const playlistsService = {
  async getMine(): Promise<Playlist[]> {
    const { data } = await api.get<Playlist[]>('/playlists/me')
    return data
  },

  async getById(id: number): Promise<Playlist> {
    const { data } = await api.get<Playlist>(`/playlists/${id}`)
    return data
  },

  async create(name: string, description: string, is_public: boolean): Promise<Playlist> {
    const { data } = await api.post<Playlist>('/playlists/', { name, description, is_public })
    return data
  },

  async update(id: number, payload: Partial<Pick<Playlist, 'name' | 'description' | 'is_public'>>): Promise<void> {
    await api.put(`/playlists/${id}`, payload)
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/playlists/${id}`)
  },

  async addTrack(playlistId: number, trackId: number): Promise<void> {
    await api.post(`/playlists/${playlistId}/tracks/${trackId}`)
  },

  async removeTrack(playlistId: number, trackId: number): Promise<void> {
    await api.delete(`/playlists/${playlistId}/tracks/${trackId}`)
  },
}
