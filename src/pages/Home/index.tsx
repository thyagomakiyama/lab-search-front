import { Alert, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Container } from '@mui/system'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import Item from '../../types/Item'
import { AxiosError } from 'axios'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { GRID_PORTUGUES_TRANSLATOR } from '../../translators/GridPortugueseTranslator'
import ExpandableCell from '../../components/ExpandableCell'
import { AuthContext } from '../../contexts/Auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { itemRepository } from '../../repositories/ItemRepository'
import Brand from '../../types/Brand'

const Home = (): JSX.Element => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const itemAPI = itemRepository()
  const [searchForm, setSearchForm] = useState({
    name: '',
    brand: ''
  })
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState('')
  const [openErrorAlert, setOpenErrorAlert] = useState(true)
  const [loading, setLoading] = useState(false)
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    setLoading(true)
    const fetchBrands = async (): Promise<void> => {
      await itemAPI.getBrands()
        .then(response => {
          setBrands(response)
        })
        .catch((error: Error | AxiosError) => {
          setError(error.message)
          setOpenErrorAlert(true)
          setBrands([])
        })
    }

    fetchBrands()
    setLoading(false)
  }, [])

  const handleSelectBrand = (event: SelectChangeEvent): void => {
    setSearchForm({
      ...searchForm,
      brand: event.target.value
    })
  }

  const handleNameField = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchForm({
      ...searchForm,
      name: event.target.value
    })
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 150 },
    { field: 'description', headerName: 'Descrição', width: 400, renderCell: (params: GridRenderCellParams) => <ExpandableCell {...params} /> },
    { field: 'price', headerName: 'Preço', width: 90 },
    { field: 'brand', headerName: 'Marca', width: 150 },
    { field: 'model', headerName: 'Modelo', width: 150 },
    { field: 'store', headerName: 'Loja', width: 150 }
  ]

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setLoading(true)

    await itemAPI.getItems(searchForm.brand, searchForm.name)
      .then(response => {
        if (response.length === 0) {
          setError('Zero item encontrados com estes filtros.')
          setOpenErrorAlert(true)
          setItems([])
        } else {
          setItems(response)
          setError('')
          setOpenErrorAlert(false)
        }
      })
      .catch((error: Error | AxiosError) => {
        console.error(error)
        setError(error.message)
        setOpenErrorAlert(true)
        setItems([])
      })

    setLoading(false)
  }

  const handleLogout = async (): Promise<void> => {
    await auth.logout(auth.token ?? '')
      .then(() => {
        navigate('/')
      })
  }

  return (
    <Box sx={{ height: '100vh', width: '100vw' }}>
      <NavBar userName={auth.user?.name ?? ''} logout={handleLogout} />
      <Container maxWidth="lg">
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8} md={7}>
              <TextField label="Nome do produto" variant="outlined" fullWidth value={searchForm.name} onChange={handleNameField} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <FormControl fullWidth>
                <InputLabel id="brand-label">Marca</InputLabel>
                <Select labelId="brand-label" value={searchForm.brand} label="Marca" onChange={handleSelectBrand}>
                  <MenuItem value={''}><em>Marca</em></MenuItem>
                  {brands.map((brand, key) => { return <MenuItem key={key} value={brand.name}>{brand.name}</MenuItem> })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <Button
                variant='contained'
                color='secondary'
                fullWidth sx={{ height: '99%' }}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={18} /> : <SearchIcon />}
                type="submit">
                Pesquisar
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: '2rem', height: '600px', width: '100%' }}>
          <DataGrid
            density='comfortable'
            columns={columns}
            rows={items}
            autoPageSize
            rowsPerPageOptions={[5, 10, 15]}
            localeText={GRID_PORTUGUES_TRANSLATOR}
            getRowHeight={() => 'auto'}
            rowHeight={70}
            sx={{
              '& .MuiDataGrid-row:hover': {
                color: 'secondary.main'
              },
              '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
              '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
              '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' }
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

export default Home
