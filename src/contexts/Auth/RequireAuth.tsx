import { useContext } from 'react'
import Loader from '../../pages/Loader'
import Login from '../../pages/Login'
import { AuthContext } from './AuthContext'
import { AUTH } from './Constants'

const RequireAuth = ({ children }: { children: JSX.Element }): JSX.Element => {
  const auth = useContext(AuthContext)

  if (auth.user == null) {
    const authToken = localStorage.getItem(AUTH.LOCAL_STORAGE_TOKEN_KEY)
    return authToken !== null ? <Loader /> : <Login />
  }

  return children
}

export default RequireAuth
