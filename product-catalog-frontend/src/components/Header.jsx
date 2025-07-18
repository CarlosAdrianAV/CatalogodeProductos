import { Box, Typography } from '@mui/material';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
//componente header
function Header() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(90deg, #6A93F8 0%, #7B4EF3 100%)',
        color: 'white',
        px: { xs: 3, md: 5 },
        py: { xs: 3, md: 4 },
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 3,
      }}
    >
      <Inventory2RoundedIcon
        sx={{
          fontSize: 180,
          color: 'rgba(255,255,255,0.08)',
          position: 'absolute',
          right: -20,
          top: -20,
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
        🛒 Catálogo de Productos
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mt: 1, color: 'rgba(255,255,255,0.9)' }}
        >
        Examen Técnico
        </Typography>
      </Box>
    </Box>
  );
}

export default Header;
