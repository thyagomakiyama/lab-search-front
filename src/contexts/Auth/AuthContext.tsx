import { createContext } from 'react'
import User from '../../types/User'

export interface AuthContextType {
  user: User | null
  signin: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>(null!)
