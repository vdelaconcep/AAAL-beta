import formatearUTC from "@/utils/formatearUTC";

const EventoCard = ({ dato, onClick }) => {
    const fechaCompleta = formatearUTC(dato.fecha);
    const fechaCorta = fechaCompleta.slice(0, 8);
    
    return (
        <article
            onClick={onClick}
            className="w-full h-full bg-gray-200 hover:bg-gray-300 overflow-hidden rounded-xl shadow-sm shadow-gray-800 cursor-pointer hover:shadow-md">
            <div className="bg-gray-800 w-full overflow-hidden">
                <img
                    className="w-full h-full object-contain aspect-[536/354]"
                    src={dato.foto_url}
                    alt={dato.nombre} />
            </div>
            <div className="p-3">
                <h1 className="font-semibold">{dato.nombre}</h1>
                <h5 className="text-gray-500">{fechaCorta}</h5>
                <h4 className="text-gray-700">{dato.descripcion}</h4>
            </div>
            
        </article>
    );
};

export default EventoCard;