import formatearUTC from "@/utils/formatearUTC";

const FotoCard = ({ foto, evento, fecha }) => {
    const fechaCompleta = formatearUTC(fecha);
    const fechaCorta = fechaCompleta.slice(0, 8)
    return (
        <article className="w-[140px]">
            <img
                className="rounded-xl"
                src={foto}
                alt={evento} />
            <h1 className="leading-none">{`de: ${evento} - ${fechaCorta}`}</h1>
        </article>
    );
};

export default FotoCard;