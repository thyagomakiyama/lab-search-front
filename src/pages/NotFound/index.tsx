import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const NotFound = (): JSX.Element => {
  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant='h3' gutterBottom>Page not found</Typography>
    </Box>
  )
}

export default NotFound
