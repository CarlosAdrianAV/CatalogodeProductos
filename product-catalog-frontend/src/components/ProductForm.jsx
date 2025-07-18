import { useState } from 'react';// Importación de Material
import {TextField,Button,Typography,Box,Alert,Paper,Grid,Container} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function ProductForm({ onCreated }) {
//Estado del formulario con los campos del producto
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });
  const [error, setError] = useState('');// Estado para mensajes de error
  const [priceError, setPriceError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Validación del precio
    if (name === 'price') {
      const num = Number(value);
      setPriceError(value === '' || isNaN(num) || num <= 0);
    }
  };
  // Envía el formulario al backend
  const handleSubmit = (e) => {
    e.preventDefault();
    // Limpieza y validación de campos
    const name = form.name.trim();
    const category = form.category.trim();
    const description = form.description.trim();
    const price = Number(form.price);
    // Validación del precioo
    if (isNaN(price) || price <= 0) {
      setError('El precio debe ser un número válido mayor a 0.');
      setPriceError(true);
      return;
    }
    // Arma el objeto producto
    const product = { name, description, price, category };
    // Realiza la solicitud POST al backend
    fetch('http://localhost:5059/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then((res) => {
        if (!res.ok)
          return res.text().then((t) => {
            throw new Error(t);
          });
        return res.json();
      })
      .then(() => {
        setForm({ name: '', description: '', price: '', category: '' });
        setError('');
        setPriceError(false);
        onCreated();
      })
      .catch((err) => setError(err.message));
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, mt: 6 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          + Agregar nuevo producto
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Completa la información del producto para agregarlo al catálogo
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {/* Formulario de producto */}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Nombre del producto"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            {/* Categoría */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Categoría"
                name="category"
                value={form.category}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            {/* Precio */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Precio (S/.)"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                error={priceError}
                helperText={priceError ? 'Debe ser mayor a 0' : ' '}
                fullWidth
                required
              />
            </Grid>
            {/* Descripción */}
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                minRows={2}
                placeholder="Descripción del producto (opcional)"
              />
            </Grid>
          </Grid>
        {/* Botón para enviar */}
          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              sx={{
                textTransform: 'none',
                borderRadius: 4,
                fontWeight: 500,
                background: 'linear-gradient(to right, #4facfe, #6b48ff)',
                boxShadow: 'rgba(0, 0, 0, 0.1)',
                maxWidth: 300,
                width: '100%'
              }}
            >
              Guardar Producto
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProductForm;