import { useState } from 'react'
import { useApi } from '../../hooks/useApi'
import User from '../../types/User'
import { AuthContext } from './AuthContext'

export const AuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)
  const api = useApi()

  const signin = async (email: string, password: string): Promise<boolean> => {
    console.log('opa')
    const data = await api.signin(email, password)
    console.log(data)

    if ((data.user != null) && (data.token != null)) {
      setUser(user)
      return true
    }

    return false
  }

  const logout = async (): Promise<void> => {
    await api.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
