import { Alert, Avatar, Box, Button, Container, Snackbar, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = (): JSX.Element => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [openErrorAlert, setOpenErrorAlert] = useState(true)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const isLogged = await auth.signin(user, password)
    if (isLogged) {
      setOpenErrorAlert(false)
      navigate('/')
    } else {
      setPassword('')
      setOpenErrorAlert(true)
    }
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
              error={auth.signError !== null}
              value={user}
              focused={auth.signError !== null}
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
              error={auth.signError !== null}
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
      {auth.signError !== null && (
        <Snackbar open={openErrorAlert} autoHideDuration={6000} onClose={() => setOpenErrorAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={() => setOpenErrorAlert(false)} severity="error" sx={{ width: '100%' }}>
            {auth.signError}
          </Alert>
        </Snackbar>
      )}
    </Box>
  )
}

export default Login