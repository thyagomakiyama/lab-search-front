import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'
import User from '../../types/User'
import { AuthContext } from './AuthContext'
import { AUTH } from './Constants'

export const AuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem(AUTH.LOCAL_STORAGE_TOKEN_KEY))
  const api = useApi()

  useEffect(() => {
    validateToken()
  }, [])

  const validateToken = async (): Promise<void> => {
    const storageDataAuthToken = localStorage.getItem(AUTH.LOCAL_STORAGE_TOKEN_KEY)
    if (storageDataAuthToken !== null) {
      await api.validateToken(storageDataAuthToken)
        .then(response => {
          if (response.user !== null) {
            setUser(response.user)
          }
        })
        .catch(() => removeToken())
    }
  }

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
    localStorage.setItem(AUTH.LOCAL_STORAGE_TOKEN_KEY, token)
  }

  const removeToken = (): void => {
    localStorage.removeItem(AUTH.LOCAL_STORAGE_TOKEN_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, token, signin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
