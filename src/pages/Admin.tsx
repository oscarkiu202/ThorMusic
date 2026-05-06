import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { AdminPanel } from '../components/Admin/AdminPanel'

export function Admin() {
  const { user } = useAuth()

  if (!user?.is_admin) return <Navigate to="/" replace />

  return <AdminPanel />
}
