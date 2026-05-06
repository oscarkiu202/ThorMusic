import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Sidebar } from './components/Layout/Sidebar'
import { Player } from './components/Layout/Player'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'
import { CreatePlaylistModal } from './components/Playlists/CreatePlaylistModal'
import { Home } from './pages/Home'
import { Search } from './pages/Search'
import { Library } from './pages/Library'
import { PlaylistPage } from './pages/Playlist'
import { Admin } from './pages/Admin'
import { playlistsService } from './services/playlists'
import type { Playlist } from './types'

function ProtectedLayout() {
  const { user, loading } = useAuth()
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    if (user) {
      playlistsService.getMine().then(setPlaylists).catch(() => {})
    }
  }, [user])

  if (loading) return (
    <div className="min-h-screen bg-thor-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 rounded-full border-2 border-thor-accent border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-thor-muted font-body text-sm">Cargando...</p>
      </div>
    </div>
  )

  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="flex h-screen bg-thor-bg text-thor-text overflow-hidden">
      {showCreate && (
        <CreatePlaylistModal
          onClose={() => setShowCreate(false)}
          onCreate={(pl) => setPlaylists((prev) => [pl, ...prev])}
        />
      )}

      <Sidebar
        playlists={playlists}
        onCreatePlaylist={() => setShowCreate(true)}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Player />
    </div>
  )
}

function AuthLayout() {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen bg-thor-bg flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-thor-accent border-t-transparent animate-spin" />
    </div>
  )

  if (user) return <Navigate to="/" replace />

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen bg-thor-bg flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-thor-accent border-t-transparent animate-spin" />
    </div>
  )

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
