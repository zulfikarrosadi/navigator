import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";


type Auth = {
  id: number;
  username: string;
}

const INITIAL_VALUE: Auth = {
  id: 0,
  username: ''
}


const AuthContext = createContext<{ auth: Auth, setAuth: Dispatch<SetStateAction<Auth>> }>({ auth: INITIAL_VALUE, setAuth: () => { } })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Auth>(INITIAL_VALUE)
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
