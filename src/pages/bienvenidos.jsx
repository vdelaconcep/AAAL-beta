import { useEffect, useState } from 'react';
import Importante from '../components/notificaciones/importante';
import Auspiciantes from "../components/auspiciantes";
import Carousel from "../components/carousel";
import Navegacion from "../components/navegacion";
import Historia from "../components/textos/historia";
import Ubicacion from '../components/ubicacion';
import VehiculosPrincipal from '../components/vehiculosPrincipal';
import NovedadesPrincipal from '../components/novedadesPrincipal';

const Bienvenidos = () => {

    const [abrirModal, setAbrirModal] = useState(false);
    /* const [mensaje, setMensaje] = useState(''); */
    
    useEffect(() => {
        /* (Descargar mensaje para notificación de inicio y guardar en setMensaje) */
        setAbrirModal(true);
    }, [])

    return (
        <div>
            <Navegacion />

            <article>
                <Carousel />
            </article>
            <Historia />
            <Ubicacion />
            <VehiculosPrincipal />
            <NovedadesPrincipal />
            <Auspiciantes />
            {abrirModal && /* mensaje && */
                <Importante
                mensaje='Atencion!!! a partir del mes de Junio de 2025 nos reuniremos los dias Viernes a partir de las 18:00 Hs.'
                setAbrirModal={setAbrirModal} />}
        </div>
    );
};

export default Bienvenidos;
