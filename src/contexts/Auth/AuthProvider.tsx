import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useApi } from '../../hooks/useApi'
import ResponseError from '../../types/ResponseError'
import User from '../../types/User'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)
  const [signError, setSignError] = useState<string | null>(null)
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
    await api.signin(email, password).then(response => {
      setUser(response.user)
      setToken(response.token)
      setSignError(null)
    }).catch((error: AxiosError<ResponseError>) => {
      handleErrorSignin(error.response?.data.message ?? 'Error to request login')
    }).catch((error: Error) => {
      handleErrorSignin(error.message)
    })

    return user !== null && signError == null
  }

  const handleErrorSignin = (errorMessage: string): void => {
    setUser(null)
    removeToken()
    setSignError(errorMessage)
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
    <AuthContext.Provider value={{ user, signError, signin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
