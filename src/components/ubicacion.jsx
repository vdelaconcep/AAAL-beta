const Ubicacion = () => {
    return (
        <section className="fondo-verde borde-inferior-verde-oscuro py-3 pt-4">
            <h1 className="pl-6 mb-5 pt-4 font-bold text-xl italic">Dónde estamos</h1>
            <article className="px-6 py-2">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.7535495728057!2d-58.4176390334281!3d-34.68616902118912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccc60204be501%3A0xb24f60cfb640a203!2sViamonte%202615%2C%20B1824%20Valent%C3%ADn%20Alsina%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1756140255680!5m2!1ses!2sar" style={{ width: "500px", height: "350px", border: "0px", boxShadow: "1px 1px 5px gray" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </article>
        </section>
    )
};

export default Ubicacion;