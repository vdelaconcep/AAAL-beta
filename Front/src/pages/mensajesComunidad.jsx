import { useState } from 'react';
import BotonSecundario from '../components/botones/secundario';
import FormComunidad from '../components/mensajesComunidad/formComunidad';

const MensajesComunidad = () => {

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    return (
        <section className="h-100 bg-amber-100 py-5 md:py-10 px-4 flex flex-col items-center text-gray-900">
            <h1 className="font-bold italic text-xl md:text-2xl mb-5">Mensajes de la Comunidad</h1>
            <BotonSecundario
                tipo='button'
                texto={<><span>Compartí tu historia </span><i className="fa-solid fa-feather"></i></>}
                accion={() => setMostrarFormulario(true)}/>
            {mostrarFormulario && <FormComunidad setMostrarFormulario={setMostrarFormulario}/>}
        </section>

    );
};

export default MensajesComunidad;