import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'
import User from '../../types/User'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const AUTH_TOKEN_KEY = 'authToken'
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem(AUTH_TOKEN_KEY))
  const api = useApi()

  useEffect(() => {
    const validateToken = async (): Promise<void> => {
      const storageDataAuthToken = localStorage.getItem(AUTH_TOKEN_KEY)
      if (storageDataAuthToken !== null) {
        try {
          const data = await api.validateToken(storageDataAuthToken)
          if (data.user !== null) {
            setUser(data.user)
          }
        } catch (error) { }
      }
    }

    validateToken()
  }, [])

  const signin = async (email: string, password: string): Promise<boolean> => {
    const data = await api.signin(email, password)

    if (data.user !== null && data.token !== null) {
      setUser(data.user)
      handleToken(data.token)
      return true
    }

    return false
  }

  const logout = async (token: string): Promise<void> => {
    removeToken()
    setUser(null)
    if (token === '') {
      await api.logout(token)
    }
  }

  const handleToken = (token: string): void => {
    setToken(token)
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  }

  const removeToken = (): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, token, signin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
