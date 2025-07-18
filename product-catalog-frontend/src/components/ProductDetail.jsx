import { useEffect, useState } from 'react'; // Importa hooks de React
import {Box, Card, CardContent, Typography, Chip, Avatar, CircularProgress, Button} from '@mui/material';// Importa componentes visuales
import { Modal } from 'react-bootstrap';

function ProductDetail({ id, onClose, open }) {
  //Estado para guardar los datos del producto
  const [product, setProduct] = useState(true);
  // Estado para saber si los datos están cargando
  const [loading, setLoading] = useState(true);
  // Función para dar formato a la fecha
  const formatDate = (date) => new Date(date).toLocaleDateString();

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    // Simula un pequeño retardo de 300ms
    setTimeout(() => {
    // Hace la petición al backend usando fetch
      fetch(`http://localhost:5059/api/products/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Error al obtener producto');
          return res.json();
        })
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => {
          setProduct(null);
          setLoading(false);
        });
    }, 300);
  }, [id]);

  return (
    // Modal para detalle de productop
    <Modal show={open} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>📦 Detalles del Producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center" p={4}>
            <CircularProgress size={32} />
            <Typography ml={2}>Cargando detalle del producto...</Typography>
          </Box>
        ) 
        : (
          <Card
            sx={{
              boxShadow: 0,
              border: 'none',
            }}
          >
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                mb={2}
                bgcolor="#f9f9f9"
                p={2}
                borderRadius={2}
              >
                <Avatar>{product.name[0]?.toUpperCase()}</Avatar>
                <Box>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {product.id}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" gap={2} mb={2}>
                <Box
                  bgcolor="#e6f4ea"
                  p={2}
                  borderRadius={2}
                  flex={1}
                  textAlign="center"
                >
                  <Typography variant="body2" color="green" fontWeight="bold">
                    Precio
                  </Typography>
                  <Typography variant="h6" color="green">
                    S/. {product.price}
                  </Typography>
                </Box>

                <Box
                  bgcolor="#eef4ff"
                  p={2}
                  borderRadius={2}
                  flex={1}
                  textAlign="center"
                >
                  <Typography variant="body2" color="primary" fontWeight="bold">
                    Categoría
                  </Typography>
                  <Chip
                    label={product.category}
                    size="small"
                    sx={{ mt: 1 }}
                    color="primary"
                    variant="soft"
                  />
                </Box>
              </Box>

              <Typography fontWeight="bold" gutterBottom>
                Descripción
              </Typography>
              <Typography mb={2}>
                {product.description || 'Sin descripción'}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <strong>Fecha de creación:</strong> {formatDate(product.createdAt)}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={onClose}
          style={{
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 500,
            background: 'linear-gradient(to right, #4facfe, #6b48ff)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            color: 'white',
            padding: '8px 24px',
          }}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductDetail;
