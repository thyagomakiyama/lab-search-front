import { Route, Routes } from 'react-router-dom'
import RequireAuth from './contexts/Auth/RequireAuth'
import Home from './pages/Home'
import Login from './pages/Login'
import Error from './pages/Error'

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route index element={<RequireAuth><Home /></RequireAuth>} />
      <Route path='*' element={<Error message='Page not found' />} />
    </Routes>
  )
}

export default App
