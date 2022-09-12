import { Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Container } from '@mui/system'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import NavBar from '../../components/NavBar'
import IItem from '../../clients/IItem'
import axios, { AxiosError } from 'axios'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { GRID_PORTUGUES_TRANSLATOR } from '../../translators/GridPortugueseTranslator'
import './index.css'

const InitialPage = (): JSX.Element => {
  const [searchForm, setSearchForm] = useState({
    search: '',
    brand: ''
  })
  const [items, setItems] = useState<IItem[]>([])
  const [error, setError] = useState('')
  const [openErrorAlert, setOpenErrorAlert] = useState(true)

  const handleSelectBrand = (event: SelectChangeEvent): void => {
    setSearchForm({
      ...searchForm,
      brand: event.target.value
    })
  }

  const handleSearchField = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchForm({
      ...searchForm,
      search: event.target.value
    })
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 150 },
    { field: 'description', headerName: 'Descrição', width: 400 },
    { field: 'price', headerName: 'Preço', width: 90 },
    { field: 'brand', headerName: 'Marca', width: 150 },
    { field: 'model', headerName: 'Modelo', width: 150 },
    { field: 'store', headerName: 'Loja', width: 150 }
  ]

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    let url = 'http://localhost:8081/items?limit=50'
    if (searchForm.brand !== '') {
      url = url + '&brand=' + searchForm.brand
    }
    if (searchForm.search !== '') {
      url = url + '&search=' + searchForm.search
    }

    axios
      .get<IItem[]>(url)
      .then(response => {
        setItems(response.data)
        setError('')
        setOpenErrorAlert(false)
      })
      .catch((error: Error | AxiosError) => {
        setError(error.message)
        setOpenErrorAlert(true)
        setItems([])
      })
  }

  return (
    <Box sx={{ height: '100vh' }}>
      <NavBar />
      <Container maxWidth="lg">
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8} md={7}>
              <TextField label="Buscar" variant="outlined" fullWidth value={searchForm.search} onChange={handleSearchField} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <FormControl fullWidth>
                <InputLabel id="brand-label">Marca</InputLabel>
                <Select labelId="brand-label" value={searchForm.brand} label="Marca" onChange={handleSelectBrand}>
                  <MenuItem value={''}><em>Marca</em></MenuItem>
                  <MenuItem value={'CANADIAN_SOLAR'}>Canadian Solar</MenuItem>
                  <MenuItem value={'FIRST_SOLAR'}>First Solar</MenuItem>
                  <MenuItem value={'RENESOLA'}>Renesola</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <Button variant='contained' color='secondary' fullWidth sx={{ height: '99%' }} startIcon={<SearchIcon />} type="submit">Pesquisar</Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: '2rem', height: '600px', width: '100%' }}>
          <DataGrid
            density='comfortable'
            columns={columns}
            rows={items}
            rowHeight={120}
            checkboxSelection
            autoPageSize
            rowsPerPageOptions={[3, 5, 10, 15]}
            localeText={GRID_PORTUGUES_TRANSLATOR}
            sx={{
              '& .MuiDataGrid-row:hover': {
                color: 'secondary.main'
              }
            }}
          />
        </Box>
      </Container>
      {error !== '' && (
        <Snackbar open={openErrorAlert} autoHideDuration={6000} onClose={() => setOpenErrorAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={() => setOpenErrorAlert(false)} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  )
}

export default InitialPage
