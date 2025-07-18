import { useState } from 'react';// Importa React y useState
import { Container, Divider } from '@mui/material';
// Importamos componentes
import ProductForm from './components/ProductForm'; //Formulario
import ProductList from './components/ProductList'; //Lista
import ProductDetail from './components/ProductDetail'; //Detalle de producto
import Header from './components/Header'; //header
import Footer from './components/Footer'; //footer

function App() {
  // Estado para guardar el ID del producto seleccionado 
  const [selectedId, setSelectedId] = useState(null);
  // Determina si se muestra el modal de detalles
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // Esta función se llama después de crear un producto y fuerza la recarga del listado
  const handleProductCreated = () => setRefresh(prev => !prev);
  // Se ejecuta al hacer click en VerDetalle
  const handleSelect = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };
  // Cierra el modal y limpia el ID seleccionado
  const handleClose = () => {
    setSelectedId(null);
    setShowModal(false);
  };

  return (
    <>
      {/* Header */}
      <Header />
      {/* Contenedor central para el contenido */}
      <Container sx={{ fontFamily: 'Poppins', paddingTop: 4 }}>
        {/* Formulario */}
        <ProductForm onCreated={handleProductCreated} />
        <Divider sx={{ my: 4 }} />
        {/* Lista de productos*/}
        <ProductList key={refresh} onSelect={handleSelect} />
        {/* Si hay un producto seleccionado, mostramos su detalle en un modal */}
        {selectedId && (
        <ProductDetail id={selectedId} open={showModal} onClose={handleClose} key={selectedId} />
        )}
      </Container>
      {/* Footer*/}
      <Footer />
    </>
  );
}
export default App;