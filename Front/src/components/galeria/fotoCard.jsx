import formatearUTC from "@/utils/formatearUTC";

const FotoCard = ({ dato, onClick }) => {
    const fechaCompleta = formatearUTC(dato.fecha);
    const fechaCorta = fechaCompleta.slice(0, 8)
    return (
        <article
            onClick={onClick}
            className="w-full group cursor-pointer">
            <div className="bg-gray-800 w-full overflow-hidden rounded-xl aspect-[536/354] shadow-sm shadow-gray-800 mb-2 group-hover:shadow-lg transition-shadow duration-100">
                <img
                    className="w-full h-full object-contain group-hover:brightness-110 group-hover:saturate-150 transition-all duration-300 ease-in-out"
                    src={dato.url}
                    alt={dato.evento} />
            </div>
            
            <h1 className="leading-none text-md md:text-lg">de: <span className="font-semibold">{dato.evento}</span></h1>
            <h5 className="text-xs md:text-md text-gray-500">{fechaCorta}</h5>
        </article>
    );
};

export default FotoCard;