import { useContext } from 'react'
import Login from '../../pages/Login'
import { AuthContext } from './AuthContext'

const RequireAuth = ({ children }: { children: JSX.Element }): JSX.Element => {
  const auth = useContext(AuthContext)

  return auth.user == null ? <Login /> : children
}

export default RequireAuth
