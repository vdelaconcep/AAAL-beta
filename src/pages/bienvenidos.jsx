import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BotonPrimario from '../components/botones/primario';
import Auspiciantes from "../components/auspiciantes";
import Carousel from "../components/carousel";
import Navegacion from "../components/navegacion";
import Historia from "../components/textos/historia";

const Bienvenidos = () => {

    const [abrirModal, setAbrirModal] = useState(false);
    
    useEffect(() => {
        /* toast.info('IMPORTANTE: A partir del mes de Junio de 2025 nos reunimos los días Viernes desde las 18:00 hs.') */
        setAbrirModal(true);
    }, [])

    return (
        <div>
            <Navegacion />

            <article className="my-4">
                <Carousel />
            </article>
            <Historia />
            <Auspiciantes />
            {abrirModal &&
                <article className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center'>
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                        <h2 className="text-xl font-bold mb-4 text-center">IMPORTANTE</h2>
                        <p>A partir del mes de Junio de 2025 nos reunimos los días Viernes desde las 18:00 hs.</p>
                        
                            <div className='flex justify-center mt-5'>
                                <BotonPrimario
                                    tipo='button'
                                    texto='OK'
                                    accion={() => setAbrirModal(false)} />
                            </div>
                    </div>

                </article>}
        </div>
    );
};

export default Bienvenidos;
