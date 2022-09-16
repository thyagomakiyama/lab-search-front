import { createContext } from 'react'
import User from '../../types/User'

export interface AuthContextType {
  user: User | null
  signError: string | null
  signin: (email: string, password: string) => Promise<boolean>
  logout: (token: string) => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AuthContext = createContext<AuthContextType>(null!)
