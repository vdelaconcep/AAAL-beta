import { useEffect } from 'react';
import { useAlert } from '@/context/alertContext';
import Auspiciantes from "@/components/principal/auspiciantes";
import Carousel from "@/components/principal/carousel";
import Historia from "@/components/principal/historia";
import Ubicacion from '@/components/principal/ubicacion';
import VehiculosPrincipal from '@/components/principal/vehiculosPrincipal';
import NovedadesPrincipal from '@/components/principal/novedadesPrincipal';
import Facah from '@/components/principal/facah';

const Bienvenidos = () => {

    const { mostrarAlert } = useAlert();

    const mensaje = 'Atención!!! a partir del mes de Junio de 2025 nos reuniremos los días Viernes a partir de las 18:00 hs.';
    
    useEffect(() => {
        mostrarAlert(mensaje, { importante: true });
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
        </div>
    );
};

export default Bienvenidos;
