import { api } from './api'
import type { AuthResponse, User } from '../types'

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password })
    return data
  },

  async register(email: string, username: string, password: string): Promise<User> {
    const { data } = await api.post<User>('/auth/register', { email, username, password })
    return data
  },

  async getMe(): Promise<User> {
    const { data } = await api.get<User>('/users/me')
    return data
  },
}
