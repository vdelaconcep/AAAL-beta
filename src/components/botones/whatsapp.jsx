

const Whatsapp = () => {
    return (
        <article>
            <button
                className="fixed bottom-4 left-4 fondo-granate text-white px-3 pt-[10px] pb-[7px] rounded-full shadow-lg shadow-black transition z-50 hover-granateOscuro border-[1.9px] border-white">
                <a href="https://wa.me/5491163067190?text=Hola%20mi%20nombre%20es"
                    target="_blank"
                    title="Enviar mensaje por whatsapp"
                    rel="noopener noreferrer">
                    <i className="fa-brands fa-whatsapp text-4xl"></i>
                </a>
            </button>
        </article>
    )
};

export default Whatsapp;