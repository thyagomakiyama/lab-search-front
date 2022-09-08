import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#607D8B',
      light: '#CFD8DC',
      dark: '#455A64',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#FF9800'
    },
    text: {
      primary: '#212121',
      secondary: '#757575'
    },
    error: {
      main: red.A400
    },
    divider: '#BDBDBD'
  }
})

export default theme
