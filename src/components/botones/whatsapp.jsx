import { useState, useEffect, useRef } from "react";

const Whatsapp = () => {

    const [mostrarContactos, setMostrarContactos] = useState(false);

    return (
        <section>
            <button
                className="fixed bottom-4 right-5 fondo-whatsapp text-white px-3 pt-[10px] pb-[7px] rounded-full shadow-md shadow-gray-900 transition z-50">
                <a href="https://wa.me/5491163067190?text=Hola%20mi%20nombre%20es"
                    target="_blank"
                    title="Enviar mensaje por whatsapp"
                    rel="noopener noreferrer">
                    <i className="fa-brands fa-whatsapp text-4xl"></i>
                </a>
            </button>
            <article className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center ${mostrarContactos ? 'block' : 'hidden'}`}>
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                    Comunicarse por wahtsapp
                </div>
            </article>
        </section>
    )
};

export default Whatsapp;