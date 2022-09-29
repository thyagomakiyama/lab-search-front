import { Typography } from '@mui/material'
import { Box } from '@mui/system'

interface ErrorPageTypes {
  message: string
}

const Error = ({ message }: ErrorPageTypes): JSX.Element => {
  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant='h3' gutterBottom>{message}</Typography>
    </Box>
  )
}

export default Error
