import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedAdminRoute({ children }) {
  const { loading, isAuthenticated, isAdmin } = useAuth()

  if (loading) {
    return (
      <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
        Carregando...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}