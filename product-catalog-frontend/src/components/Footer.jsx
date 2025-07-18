import { Box, Typography } from '@mui/material';
//componente footer
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 3,
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #ddd',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Catálogo de Productos -- Desarrollado por CAAV --
      </Typography>
    </Box>
  );
}

export default Footer;
