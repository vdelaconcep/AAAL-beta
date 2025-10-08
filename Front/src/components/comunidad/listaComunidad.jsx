import formatearUTC from '@/utils/formatearUTC.js';
import BotonTransparente from '@/components/botones/transparente'

const ListaComunidad = ({ mensajes }) => {
    return (
        <section className='border-[2px] border-[#6E1538] rounded-xl overflow-y-auto w-full shadow-xs shadow-gray-800'>
            {mensajes.slice().reverse().map(mensaje => {
                let fecha = formatearUTC(mensaje.created_at);
                fecha = fecha.split(',')[0];

                return (
                    <article
                        key={mensaje.id}
                        className='bg-[#A0AB94] border-b-[1px] border-b-gray-500 last-of-type:border-none p-4 py-2'>
                        <div className='flex justify-between items-center'>
                            <h4 className='font-bold'>{mensaje.titulo}</h4>
                            <h6 className='text-xs'>{fecha}</h6>
                        
                        </div>
                        
                        <h6>{mensaje.nombre} - {mensaje.relacion}</h6>
                        
                    </article>
                )
            })}
        </section>
    );
};

export default ListaComunidad;