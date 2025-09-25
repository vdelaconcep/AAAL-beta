import { useState } from 'react';
import BotonSecundario from '../components/botones/secundario';
import FormComunidad from '../components/mensajesComunidad/formComunidad';

const MensajesComunidad = () => {

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    return (
        <div className="h-100 bg-white">
            <h1 className="text-black">Página de Mensajes de la Comunidad</h1>
            <BotonSecundario
                tipo='button'
                texto={<><span>Compartí tu historia </span><i className="fa-solid fa-feather"></i></>}
                accion={() => setMostrarFormulario(true)}/>
            {mostrarFormulario && <FormComunidad setMostrarFormulario={setMostrarFormulario}/>}
        </div>

    );
};

export default MensajesComunidad;