import { useContext } from 'react'
import AuthContext from '../context/auth.tsx'

export default function useAuth() {
  return useContext(AuthContext)
}
