import { useState, useRef } from 'react';
import { obtenerMensajesAprobados } from '@/services/comunidadService';
import { useAlert } from '@/context/alertContext';
import { usePaginacion } from '../hooks/usePaginacion';
import { useFooterVisible } from '@/hooks/useFooterVisible';
import { motion } from 'framer-motion';
import MensajeComunidad from '@/components/comunidad/mensajeComunidad';
import BotonPrimario from '@/components/botones/primario';
import FormComunidad from '@/components/comunidad/formComunidad';
import ControlPagina from '@/components/otros/controlPagina';

const Comunidad = () => {

    const { mostrarAlert } = useAlert();
    const footerVisible = useFooterVisible();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const mainRef = useRef(null);

    const {
        datos: mensajes,
        cargando,
        pagina,
        setPagina,
        totalPaginas,
        accion,
        setAccion
    } = usePaginacion(obtenerMensajesAprobados, mostrarAlert)

    return (
        <main
            ref={mainRef}
            className="relative h-full bg-white py-5 md:py-10 px-4 md:px-10 flex flex-col items-center text-gray-900 overflow-x-hidden">
            <h1 className="font-bold italic text-xl md:text-2xl mb-3">Mensajes de la Comunidad</h1>
            <section className='mb-2 md:mb-3'>
                {cargando ? <h6>Cargando...</h6> : (mensajes.length > 0 ?
                    <motion.div
                        key={pagina}
                        {... (accion === 'siguiente' ? {
                            initial: { x: 100, opacity: 0 },
                            transition: { duration: 0.9 },
                            animate: { x: 0, opacity: 1 }
                        } : (accion === 'anterior' ? {
                            initial: { x: -100, opacity: 0 },
                            transition: { duration: 0.9 },
                            animate: { x: 0, opacity: 1 }
                            } : {
                                initial: { y: 50, opacity: 0 },
                                transition: { duration: 0.9 },
                                animate: { y: 0, opacity: 1 }
                            }))}>
                        {
                            mensajes.map(mensaje =>
                                <article
                                    key={mensaje.id}
                                    className='bg-[#A0AB94] shadow-md shadow-gray-800 px-4 py-5 flex flex-col justify-between rounded-xl w-full mb-3'>
                                    <MensajeComunidad mensaje={mensaje} />
                                </article>
                            )}
                    </motion.div>
                    
                    : <h6>No hay mensajes para mostrar</h6>)}
            </section>

            {!cargando && mensajes.length > 1 && 
                <div className='pb-10 md:pb-2'>
                    <ControlPagina
                        pagina={pagina}
                        setPagina={setPagina}
                        totalPaginas={totalPaginas}
                        setAccion={setAccion}
                        mainRef={mainRef} />
                </div>
            }
            
            <BotonPrimario
                tipo='button'
                texto={<><span>Compartí tu historia </span><i className="fa-solid fa-feather"></i></>}
                accion={() => setMostrarFormulario(true)}
                clase={`w-[210px] md:w-[300px] md:mt-4 text-shadow-xs text-shadow-gray-800 left-5 z-40 ${footerVisible ? 'absolute bottom-3 w-[calc(100%-2rem)]' : 'fixed bottom-6'} md:relative md:bottom-auto md:left-auto md:z-auto`}
            />
            {mostrarFormulario && <FormComunidad mostrarFormulario={mostrarFormulario} setMostrarFormulario={setMostrarFormulario}/>}
        </main>

    );
};

export default Comunidad;