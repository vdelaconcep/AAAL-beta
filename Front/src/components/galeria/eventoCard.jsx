const EventoCard = (nombre, fecha, foto) => {
    return (
        <article>
            <img src={foto} alt={nombre} />
            <h1>{nombre}</h1>
            <h5>{fecha}</h5>
        </article>
    );
};

export default EventoCard;