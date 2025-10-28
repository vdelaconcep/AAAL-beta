import formatearUTC from "@/utils/formatearUTC";
import BotonSecundario from '@/components/botones/secundario'

const EventoCard = ({ dato, onClick }) => {
    const fechaCompleta = formatearUTC(dato.fecha);
    const fechaCorta = fechaCompleta.slice(0, 8);
    
    return (
        <article
            
            className="w-full h-full bg-white overflow-hidden rounded-xl shadow-sm shadow-gray-800 hover:shadow-md group flex flex-col justify-between">
            <div>
                {dato.foto_url ?
                    <div className="bg-gray-800 w-full overflow-hidden group">
                        <img
                            className="w-full h-full object-contain aspect-[536/354] group-hover:brightness-105 transition-all duration-300 ease-in-out"
                            src={dato.foto_url}
                            alt={dato.nombre} />
                    </div> :
                    <div className="w-full h-full aspect-[536/354] animate-pulse bg-gray-200"></div>
                }
                
                <h1 className="px-3 pt-2 font-bold">{dato.nombre}</h1>
                <h4 className="text-gray-700 leading-5 px-3 pb-3">{dato.descripcion}</h4>
            </div>
            <div className="h-[52px]">
                <hr className="text-gray-300"/>
                <div className="px-3 pt-2 flex justify-between items-center">
                    <h5 className="text-gray-500">{fechaCorta}</h5>
                    <BotonSecundario
                        accion={onClick}
                        texto='Ver fotos'
                        clase='py-1 w-1/2 rounded-md' />
                </div>
            </div>
            
        </article>
    );
};

export default EventoCard;