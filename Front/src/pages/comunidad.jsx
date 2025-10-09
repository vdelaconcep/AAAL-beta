import { useEffect, useState } from 'react';
import { obtenerMensajesAprobados } from '@/services/comunidadService';
import { useAlert } from '@/context/alertContext';
import { useFooterVisible } from '@/hooks/useFooterVisible';
import MensajeComunidad from '@/components/comunidad/mensajeComunidad';
import BotonPrimario from '@/components/botones/primario';
import FormComunidad from '@/components/comunidad/formComunidad';

const Comunidad = () => {

    const { mostrarAlert } = useAlert();

    const footerVisible = useFooterVisible();

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mensajes, setMensajes] = useState([]);
    const [cargando, setCargando] = useState(false);

    const traerMensajesAprobados = async () => {
        setCargando(true);
        try {
            const res = await obtenerMensajesAprobados(1);
            if (res.status !== 200) {
                const mensajeAlert = `Error al obtener mensajes ${res.statusText}`;
                mostrarAlert(mensajeAlert);
                return;
            };

            setMensajes(res.data.rows);
            return;

        } catch (err) {
            const mensajeAlert = `Error al obtener datos: ${err.response?.data?.error || err.message || 'Error desconocido'}`;
            mostrarAlert(mensajeAlert);
            return;
        } finally {
            setCargando(false);
        };
    };

    useEffect(() => {
        traerMensajesAprobados();
    }, []);

    return (
        <main className="relative h-full bg-amber-100 py-5 md:py-10 px-4 md:px-10 flex flex-col items-center text-gray-900">
            <h1 className="font-bold italic text-xl md:text-2xl mb-6">Mensajes de la Comunidad</h1>
            <section className='mb-8 md:mb-0'>
                {cargando ? <h6>Cargando...</h6> : (mensajes.length > 0 ?

                    (
                        mensajes.map(mensaje =>
                            <article
                                key={mensaje.id}
                                className='bg-[#A0AB94] shadow-md shadow-gray-800 px-4 py-5 flex flex-col justify-between rounded-xl w-full mb-3'>
                                <MensajeComunidad mensaje={mensaje} />
                            </article>
                        ))
                    : <h6>No hay mensajes para mostrar</h6>)}
            </section>
            
            <BotonPrimario
                tipo='button'
                texto={<><span>Compartí tu historia </span><i className="fa-solid fa-feather"></i></>}
                accion={() => setMostrarFormulario(true)}
                clase={`w-[200px] md:w-[300px] md:mt-4 text-shadow-xs text-shadow-gray-800 left-4 z-40 ${footerVisible ? 'absolute bottom-3' : 'fixed bottom-6'} md:relative md:bottom-auto md:left-auto md:z-auto`}
            />
            {mostrarFormulario && <FormComunidad mostrarFormulario={mostrarFormulario} setMostrarFormulario={setMostrarFormulario}/>}
        </main>

    );
};

export default Comunidad;