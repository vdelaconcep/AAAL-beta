import formatearUTC from '@/utils/formatearUTC.js';

const MensajeComunidad = ({ mensaje }) => {

    let fecha = formatearUTC(mensaje.created_at);
    fecha = fecha.split(',')[0];

    return (
        <article className='text-gray-900'>
            <div className='flex justify-between items-center'>
                <h4 className='font-bold text-lg italic'>{mensaje.titulo}</h4>
                <h6>Enviado: {fecha}</h6>
            </div>
            
            <h6 className='mb-5 font-medium'>{mensaje.nombre} - {mensaje.relacion}</h6>
            
            <div className='md:flex md:gap-5'>
                
                {mensaje.foto &&
                    <img
                    className='md:flex-1 w-full h-auto rounded-lg shadow-xs shadow-gray-800'
                    src={mensaje.foto}
                    alt={`Imagen de "${mensaje.titulo}"`} />
                }
                <p className='md:flex-1'>{mensaje.mensaje}</p>
            </div>
        </article>
    );
};

export default MensajeComunidad;