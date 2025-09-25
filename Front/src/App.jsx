import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout';
import Bienvenidos from './pages/principal';
import QuienesSomos from './pages/quienesSomos';
import Historia from './pages/historia';
import Comision from './pages/comision';
import MensajesComunidad from './pages/mensajesComunidad';
import Institucional from './pages/institucional';
import ProximosEventos from './pages/proximosEventos';
import Clasificados from './pages/clasificados';
import Fotos from './pages/fotos';
import Videos from './pages/videos';
import NuestrosVehiculos from './pages/nuestrosVehiculos';
import MotoresEstacionarios from './pages/motoresEstacionarios';
import Contacto from './pages/contacto'
import './style.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Bienvenidos />} />
            <Route path='/quienessomos' element={<QuienesSomos />} />
            <Route path='/historia' element={<Historia />} />
            <Route path='/comisiondirectiva' element={<Comision />} />
            <Route path='/mensajesdelacomunidad' element={<MensajesComunidad />} />
            <Route path='/institucional' element={<Institucional />} />
            <Route path='/proximoseventos' element={<ProximosEventos />} />
            <Route path='/clasificados' element={<Clasificados />} />
            <Route path='/fotos' element={<Fotos />} />
            <Route path='/videos' element={<Videos />} />
            <Route path='/nuestrosvehiculos' element={<NuestrosVehiculos />} />
            <Route path='/motoresestacionarios' element={<MotoresEstacionarios />} />
            <Route path='/contacto' element={<Contacto />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
