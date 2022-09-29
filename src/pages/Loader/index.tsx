import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'

const Loader = (): JSX.Element => {
  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  )
}

export default Loader
