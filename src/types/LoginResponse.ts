import User from './User'

interface LoginResponse {
  user: User
  token: string
}

export default LoginResponse
