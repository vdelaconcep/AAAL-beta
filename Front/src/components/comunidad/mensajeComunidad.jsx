import formatearUTC from '@/utils/formatearUTC.js';
import { useState } from 'react';

const MensajeComunidad = ({ mensaje }) => {

    let fecha = formatearUTC(mensaje.created_at);
    fecha = fecha.split(',')[0];

    const [mostrarMas, setMostrarMas] = useState(false);

    const mensajeEsLargo = (mensaje.mensaje).length > 100;

    return (
        <article className='text-gray-900'>
            <div className='flex md:justify-between items-center'>
                <h4 className='font-bold text-lg italic leading-tight mb-1'>{mensaje.titulo}</h4>
                <h6 className='hidden md:block'>Enviado: {fecha}</h6>
            </div>
            
            <h6 className='mb-2 md:mb-4 font-medium leading-tight'>{mensaje.nombre} - {mensaje.relacion}</h6>
            <h6 className='md:hidden mb-2'>Enviado: {fecha}</h6>
            
            <div className='md:flex md:gap-5'>
                {mensaje.foto &&
                    <div className='md:flex-1 w-full h-auto md:max-h-[80vh] rounded-lg shadow-xs shadow-gray-800 mb-2 md:mb-0 overflow-hidden bg-gray-800'>
                        <img
                            className='w-full h-full object-contain'
                            src={mensaje.foto}
                            alt={`Imagen de "${mensaje.titulo}"`} />
                    
                    </div>
                }
                <p className='hidden md:block flex-1'>{mensaje.mensaje}</p>
                <div className='md:hidden'>
                    <p className='inline'>{!mostrarMas ? (mensajeEsLargo ? mensaje.mensaje.slice(0, 100) : mensaje.mensaje) : mensaje.mensaje}</p>
                    {!mostrarMas && mensajeEsLargo &&
                        <button
                            className='inline underline font-medium ml-1'
                            onClick={() => setMostrarMas(true)}> mostrar más</button>
                    }
                </div>
                
            </div>
            
        </article>
    );
};

export default MensajeComunidad;