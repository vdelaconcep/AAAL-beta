import { useEffect, useState } from 'react';
import Alert from '../components/otros/alert';
import Auspiciantes from "../components/principal/auspiciantes";
import Carousel from "../components/principal/carousel";
import Historia from "../components/principal/historia";
import Ubicacion from '../components/principal/ubicacion';
import VehiculosPrincipal from '../components/principal/vehiculosPrincipal';
import NovedadesPrincipal from '../components/principal/novedadesPrincipal';
import Facah from '../components/principal/facah';

const Bienvenidos = () => {

    const [abrirModal, setAbrirModal] = useState(false);
    /* const [mensaje, setMensaje] = useState(''); */
    
    useEffect(() => {
        /* (Descargar mensaje para notificación de inicio y guardar en setMensaje) */
        setAbrirModal(true);
    }, [])

    return (
        <div>
            <article>
                <Carousel />
            </article>

            <Historia />

            <article className='md:flex'>
                <NovedadesPrincipal />
                <Ubicacion />
            </article>
            
            <VehiculosPrincipal />
            
            <Facah />
            <Auspiciantes />
            {abrirModal && /* mensaje && */
                <Alert
                mensaje='Atención!!! a partir del mes de Junio de 2025 nos reuniremos los días Viernes a partir de las 18:00 hs.'
                setAbrirModal={setAbrirModal}
                importante={true} />}
        </div>
    );
};

export default Bienvenidos;
