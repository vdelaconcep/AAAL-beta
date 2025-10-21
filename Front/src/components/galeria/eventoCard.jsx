import formatearUTC from "@/utils/formatearUTC";

const EventoCard = ({ dato }) => {
    const fechaCompleta = formatearUTC(dato.fecha);
    const fechaCorta = fechaCompleta.slice(0, 8);
    
    return (
        <article className="w-full h-full bg-[#DECBA0] overflow-hidden rounded-xl shadow-sm shadow-gray-800 group cursor-pointer">
            <div className="bg-gray-800 w-full overflow-hidden">
                <img
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 ease-in-out aspect-[536/354]"
                    src={dato.foto_url}
                    alt={dato.nombre} />
            </div>
            <div className="p-3">
                <h1 className="font-semibold">{dato.nombre}</h1>
                <h5>{fechaCorta}</h5>
            </div>
            
        </article>
    );
};

export default EventoCard;