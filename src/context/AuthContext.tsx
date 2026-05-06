import React, { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../services/auth'
import type { User } from '../types'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('thor_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      authService.getMe()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('thor_token')
          setToken(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email: string, password: string) => {
    const { access_token } = await authService.login(email, password)
    localStorage.setItem('thor_token', access_token)
    setToken(access_token)
    const me = await authService.getMe()
    setUser(me)
  }

  const register = async (email: string, username: string, password: string) => {
    await authService.register(email, username, password)
    await login(email, password)
  }

  const logout = () => {
    localStorage.removeItem('thor_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
