import { AppBar, Box, Toolbar, Typography } from '@mui/material'

const NavBar = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Search Front
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
