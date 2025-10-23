import formatearUTC from "@/utils/formatearUTC";
import BotonSecundario from '@/components/botones/secundario'

const EventoCard = ({ dato, onClick }) => {
    const fechaCompleta = formatearUTC(dato.fecha);
    const fechaCorta = fechaCompleta.slice(0, 8);
    
    return (
        <article
            onClick={onClick}
            className="w-full h-full bg-white overflow-hidden rounded-xl shadow-sm shadow-gray-800 cursor-pointer hover:shadow-md group">
            <div className="bg-gray-800 w-full overflow-hidden group">
                <img
                    className="w-full h-full object-contain aspect-[536/354] group-hover:brightness-105 transition-all duration-300 ease-in-out"
                    src={dato.foto_url}
                    alt={dato.nombre} />
            </div>
            <div className="pt-3 pb-2 ">
                <h1 className="px-3 font-bold">{dato.nombre}</h1>
                <h4 className="text-gray-700 leading-5 px-3 pb-3">{dato.descripcion}</h4>
                <hr />
                <div className="px-3 pt-2 flex justify-between h-[30px]">
                    <h5 className="text-gray-500">{fechaCorta}</h5>
                    <BotonSecundario
                        texto='ver'
                    clase='py-0 rounded-[5px]'/>
                </div>
                
                
            </div>
            
        </article>
    );
};

export default EventoCard;