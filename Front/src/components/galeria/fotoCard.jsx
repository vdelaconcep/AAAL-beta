import formatearUTC from "@/utils/formatearUTC";

const FotoCard = ({ foto, evento, fecha }) => {
    const fechaCompleta = formatearUTC(fecha);
    const fechaCorta = fechaCompleta.slice(0, 8)
    return (
        <article className="w-full">
            <div className="bg-gray-800 w-full overflow-hidden rounded-xl">
                <img
                    className="w-full h-full object-contain"
                    src={foto}
                    alt={evento} />
            </div>
            
            <h1 className="leading-none text-md md:text-lg">de: <b>{evento}</b></h1>
            <h5 className="text-xs md:text-md text-gray-500">{fechaCorta}</h5>
        </article>
    );
};

export default FotoCard;