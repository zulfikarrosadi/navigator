import axios from "@/axios"
import useAuth from "./useAuth"
import { ApiResponse } from "@/schema"

type Success = {
  users: {
    username: string;
    id: number;
  }
}

function useRefreshToken() {
  const auth = useAuth()

  const refresh = async () => {
    try {
      const res = await axios.get<ApiResponse<Success>>('/refresh')
      if (res.data.status !== 'success') {
        throw new Error(`Refreshing fail: ${res.data.error.message}`)
      }
      auth.setAuth((prev) => ({
        ...prev,
        id: res.data.data.users.id,
        username: res.data.data.users.username
      }))
    } catch (error: any) {
      return Promise.reject(error)
    }
  }

  return refresh
}

export default useRefreshToken
