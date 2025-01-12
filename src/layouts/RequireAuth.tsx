import useAuth from '@/hooks/useAuth'
import { useLocation } from 'react-router'
import { Navigate, Outlet } from 'react-router'

function RequireAuth() {
  const { auth } = useAuth()
  const location = useLocation()

  if (!auth.username || !auth.id) {
    return <Navigate to='/auth/signin' state={{ from: location }} replace />
  }

  return <Outlet />
}

export default RequireAuth
