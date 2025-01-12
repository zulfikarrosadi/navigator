import useAuth from "@/hooks/useAuth"
import { Navigate } from "react-router"

function SignOut() {
  const { setAuth } = useAuth()
  setAuth({ id: 0, username: '' })

  return <>
    <Navigate to='/' />
  </>
}

export default SignOut
