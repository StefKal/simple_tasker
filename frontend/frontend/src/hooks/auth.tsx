import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { jwtDecode } from 'jwt-decode'
import { AuthContextType, AuthTokens } from '../types/auth'

const AuthContext = createContext(null)

export default AuthContext

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  let [authTokens, setAuthTokens] = useState<AuthTokens | null>(() => {
    const item = localStorage.getItem('authTokens')
    return item ? JSON.parse(item) : null
  })

  let [user, setUser] = useState(() => {
    const item = localStorage.getItem('authTokens')
    return item ? jwtDecode(item) : null
  })

  let loginUser = (data: AuthTokens) => {
    setAuthTokens(data)
    const user = jwtDecode(data.access)
    setUser(user)
    localStorage.setItem('authTokens', JSON.stringify(data))
  }

  let logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
  }

  let contextData: AuthContextType = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access))
    }
  }, [authTokens])

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
