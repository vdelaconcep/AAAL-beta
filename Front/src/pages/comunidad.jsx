import { useEffect, useState } from 'react';
import { obtenerMensajesAprobados } from '@/services/comunidadService';
import { useAlert } from '@/context/alertContext';
import ListaComunidad from '@/components/comunidad/listaComunidad';
import BotonPrimario from '@/components/botones/primario';
import FormComunidad from '@/components/comunidad/formComunidad';

const Comunidad = () => {

    const { mostrarAlert } = useAlert();

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mensajes, setMensajes] = useState([]);
    const [cargando, setCargando] = useState(false);

    const traerMensajesAprobados = async () => {
        setCargando(true);
        try {
            const res = await obtenerMensajesAprobados();
            if (res.status !== 200) {
                const mensajeAlert = `Error al obtener mensajes ${res.statusText}`;
                mostrarAlert(mensajeAlert);
                return;
            };

            setMensajes(res.data);
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
        <main className="h-100 bg-amber-100 py-5 md:py-10 px-4 flex flex-col items-center text-gray-900">
            <h1 className="font-bold italic text-xl md:text-2xl mb-5">Mensajes de la Comunidad</h1>
            {cargando ? <h6>Cargando...</h6> : (mensajes.length > 0 ? 
                <ListaComunidad mensajes={mensajes} /> :
                <h6>No hay mensajes para mostrar</h6>)}
            <BotonPrimario
                tipo='button'
                texto={<><span>Compartí tu historia </span><i className="fa-solid fa-feather"></i></>}
                accion={() => setMostrarFormulario(true)}
                clase='w-full mt-4 text-shadow-xs text-shadow-gray-800'
            />
            {mostrarFormulario && <FormComunidad mostrarFormulario={mostrarFormulario} setMostrarFormulario={setMostrarFormulario}/>}
        </main>

    );
};

export default Comunidad;