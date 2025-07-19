import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { api } from './api'

const PUBLIC_ROUTES = ['/', '/login', '/register']

export function AuthGuard({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const currentPath = location.pathname

      if (PUBLIC_ROUTES.includes(currentPath)) {
        setAuthorized(true)
        setLoading(false)
        return
      }

      try {
        await api.get('/auth/token') // usa sua função
        setAuthorized(true)
      } catch (err) {
        setAuthorized(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [location.pathname])

  if (loading) return <div>Verificando autenticação...</div>
  if (!authorized) return <Navigate to="/login" replace />

  return children
}
