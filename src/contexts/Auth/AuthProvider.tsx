import { useEffect, useState } from 'react'
import User from '../../types/User'
import { AuthContext } from './AuthContext'
import { AUTH } from './Constants'
import { firebaseAuth } from '../../services/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const AuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem(AUTH.LOCAL_STORAGE_TOKEN_KEY))

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser !== null) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName
        })
      } else {
        removeToken()
        setUser(null)
      }
    })
  }, [])

  const signin = async (email: string, password: string): Promise<boolean> => {
    const data = await signInWithEmailAndPassword(firebaseAuth, email, password)

    if (data.user !== null) {
      const token = data.user.getIdToken()
      token.then(tk => {
        handleToken(tk)
        setUser({
          id: data.user.uid,
          email: data.user.email,
          name: data.user.displayName
        })
        return true
      })
    }

    return false
  }

  const logout = async (): Promise<void> => {
    removeToken()
    setUser(null)
    await firebaseAuth.signOut()
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
