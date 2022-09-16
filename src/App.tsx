import { Route, Routes } from 'react-router-dom'
import RequireAuth from './contexts/Auth/RequireAuth'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route index element={<RequireAuth><Home /></RequireAuth>} />
      {/* <Route index element={<Home />} /> */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
