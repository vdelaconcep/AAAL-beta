import formatearUTC from '@/utils/formatearUTC.js';

const MensajeComunidad = ({ mensaje }) => {

    let fecha = formatearUTC(mensaje.created_at);
    fecha = fecha.split(',')[0];

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
                    <img
                    className='md:flex-1 w-full h-auto rounded-lg shadow-xs shadow-gray-800 mb-2 md:mb-0'
                    src={mensaje.foto}
                    alt={`Imagen de "${mensaje.titulo}"`} />
                }
                <p className='md:flex-1'>{mensaje.mensaje}</p>
            </div>
        </article>
    );
};

export default MensajeComunidad;