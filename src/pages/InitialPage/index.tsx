import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Container } from '@mui/system'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import NavBar from '../../components/NavBar'

const InitialPage = (): JSX.Element => {
  const [searchForm, setSearchForm] = useState({
    search: '',
    brand: ''
  })

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    console.log(searchForm)
    alert('search: ' + searchForm.search + ' brand: ' + searchForm.brand)
  }

  return (
    <>
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
      </Container>
    </>
  )
}

export default InitialPage
