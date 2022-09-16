import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'
import User from '../../types/User'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)
  const api = useApi()
  const AUTH_TOKEN_KEY = 'authToken'

  useEffect(() => {
    const validateToken = async (): Promise<void> => {
      const storageDataAuthToken = localStorage.getItem('authToken')
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
  }, [api])

  const signin = async (email: string, password: string): Promise<boolean> => {
    const data = await api.signin(email, password)

    if (data.user !== null && data.token !== null) {
      setUser(data.user)
      setToken(data.token)
      return true
    }

    return false
  }

  const logout = async (token: string): Promise<void> => {
    await api.logout(token).finally(() => {
      removeToken()
      setUser(null)
    })
  }

  const setToken = (token: string): void => {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  }

  const removeToken = (): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, signin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
