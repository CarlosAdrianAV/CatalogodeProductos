// Importa React hooks y componentes de Material UI
import { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead,TableRow, Paper, Button, 
        Typography, TextField, TablePagination, Box, InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';//icono de busqueda
import VisibilityIcon from '@mui/icons-material/Visibility';//iconoco de visibilidad
import ViewListIcon from '@mui/icons-material/ViewList';
// Lista de productos
function ProductList({ onSelect }) {
    
  const [products, setProducts] = useState([]);// Todos los productos
  const [filtered, setFiltered] = useState([]);// Productos filtrados por nombre o categoría
  const [searchName, setSearchName] = useState('');// Búsqueda por nombre
  const [searchCategory, setSearchCategory] = useState('');// Búsqueda por categoría
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);// Filas por página
// Llamada al backend al para el componente
  useEffect(() => {
    fetch('http://localhost:5059/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

// Filtrado cada  que se cambia el nombre o la categoria
  useEffect(() => {
    const filteredData = products.filter(p =>
      p.name.toLowerCase().includes(searchName.toLowerCase()) &&
      p.category.toLowerCase().includes(searchCategory.toLowerCase())
    );
    setFiltered(filteredData);// Lista filtrada
    setPage(0);//reinicio
  }, [searchName, searchCategory, products]);
// Canrtidad de filas por pagina
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      {/* Titulo de listado*/}
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <ViewListIcon fontSize="large" sx={{ color: '#000' }} />
        <Typography variant="h5" fontWeight="bold">
          Listado de Productos
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" mb={3}>
        {filtered.length} producto{filtered.length !== 1 && 's'} encontrado{filtered.length !== 1 && 's'}
      </Typography>

      {/* Filtros */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        sx={{
          backgroundColor: '#f9f9f9',
          padding: 2,
          borderRadius: 2,
          mb: 3
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} sx={{ minWidth: '100%' }}>
        Filtros Avanzados
        </Typography>
        {/* Buscar por nombre */}
        <TextField
          placeholder="Buscar por nombre"
          value={searchName??''}
          onChange={e => setSearchName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        {/* Buscar por categoría */}
        <TextField
          placeholder="Buscar por categoría"
          value={searchCategory??''}
          onChange={e => setSearchCategory(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Tabla */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f4f6f8' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Precio (S/.)</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Categoría</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Detalles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length > 0 ? (
              filtered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((p, i) => (
                  <TableRow
                    key={p.id}
                    sx={{
                      backgroundColor: i % 2 === 0 ? '#fff' : '#fefefe','&:hover': { backgroundColor: '#f1f1f1' },
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    <TableCell>{p.id}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell sx={{ color: 'green', fontWeight: 600 }}> S/. {p.price} </TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          backgroundColor: '#f0f0ff',
                          color: '#444',
                          borderRadius: '999px',
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}> {p.category}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => onSelect(p.id)}
                        sx={{
                          textTransform: 'none',
                          borderRadius: 2,
                          px: 2,
                          fontWeight: 500
                        }}>Ver Detalle
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  No se encontraron productos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
      />
    </Box>
  );
}

export default ProductList;