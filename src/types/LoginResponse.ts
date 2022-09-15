import User from './User'

interface LoginResponse {
  user: User | null
  token: string | null
}

export default LoginResponse
