import { Alert, Avatar, Box, Button, Container, Snackbar, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import ResponseError from '../../types/ResponseError'

const Login = (): JSX.Element => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [openErrorAlert, setOpenErrorAlert] = useState(true)
  const [loginError, setLoginError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    await auth.signin(user, password)
      .then(() => {
        setOpenErrorAlert(false)
        navigate('/')
      }).catch((error: AxiosError<ResponseError>) => {
        handleErrorLogin(error.response?.data.message ?? 'Error to request login')
      }).catch((error: Error) => {
        handleErrorLogin(error.message)
      })
  }

  const handleErrorLogin = (errorMessage: string): void => {
    setPassword('')
    setOpenErrorAlert(true)
    setLoginError(errorMessage)
  }

  return (
    <Box sx={{ height: '100vh', width: '100vw' }}>
      <Container component='main' maxWidth='xs'>
        <Box
          component='form'
          onSubmit={handleSubmit}
          autoComplete='off'
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Search System
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              error={loginError !== ''}
              value={user}
              focused={loginError !== ''}
              margin='normal'
              required
              fullWidth
              id='user'
              label='usuário'
              name='user'
              autoFocus
              onChange={e => setUser(e.target.value)}
            />
            <TextField
              error={loginError !== ''}
              value={password}
              margin='normal'
              required
              fullWidth
              name='password'
              label='senha'
              type='password'
              id='password'
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      {loginError !== '' && (
        <Snackbar open={openErrorAlert} autoHideDuration={6000} onClose={() => setOpenErrorAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={() => setOpenErrorAlert(false)} severity="error" sx={{ width: '100%' }}>
            {loginError}
          </Alert>
        </Snackbar>
      )}
    </Box>
  )
}

export default Login
