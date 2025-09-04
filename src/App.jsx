import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout';
import Bienvenidos from './pages/principal';
import './style.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Bienvenidos />} />
            {/* <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/comision-directiva" element={<ComisionDirectiva />} />
            <Route path="/socios" element={<Socios />} />
            <Route path="/comunicados" element={<Comunicados />} />
            <Route path="/fotos" element={<GaleriaFotos />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/clasificados" element={<Clasificados />} />
            <Route path="/vehiculos" element={<Vehiculos />} />
            <Route path="/contacto" element={<PaginaContacto />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
