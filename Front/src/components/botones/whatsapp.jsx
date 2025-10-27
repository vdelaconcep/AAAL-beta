import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from 'lucide-react';

const Whatsapp = () => {

    const contactos = [
        {nombre: 'Sr. Jorge Schneebeli', telefono:5491140930943},
        {nombre: 'Sr. Rubén Ruffo', telefono:5491163067190},
        {nombre: 'Sr. Sergio Aliukonis', telefono:5491137958022}
    ]

    const [mostrarContactos, setMostrarContactos] = useState(false);

    const modalRef = useRef();
    const btnRef = useRef();

    useEffect(() => {
        const cerrarModalEsc = (evento) => {
            if (mostrarContactos && evento.key === "Escape") setMostrarContactos(false);
        };

        document.addEventListener('keydown', cerrarModalEsc);

        return () => {
            document.removeEventListener('keydown', cerrarModalEsc);
        };

    }, [mostrarContactos, setMostrarContactos]);

    return (
        <>
        <section className="sticky bottom-0 w-full pointer-events-none z-40">
            <div className="flex justify-end pr-5 pointer-events-auto">
                <button
                    className="absolute bottom-5 right-5 bg-[#36BB68] text-white px-3 pt-[10px] pb-[7px] rounded-full shadow-md shadow-gray-900 z-40 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-108"
                    title="Contactar por whatsapp"
                    onClick={() => setMostrarContactos(true)}>
                    <i className="fa-brands fa-whatsapp text-4xl"></i>
                </button>
                </div>
            </section>
            
            {mostrarContactos &&
                <div
                    className='fixed inset-0 bg-black/70 backdrop-blur-sm z-60 flex items-center justify-center px-2'
                    onClick={() => setMostrarContactos(false)}>
                    <button
                        onClick={() => setMostrarContactos(false)}
                        className="absolute top-2 md:top-4 right-2 md:right-4 text-white hover:text-gray-300 transition-colors z-20 bg-black bg-opacity-50 rounded-full p-2"
                        aria-label="Cerrar"
                    >
                        <X size={32} />
                    </button>
                    <motion.div
                        className="bg-gray-300 border-2 border-[#6E1538] px-2 md:px-6 py-2 rounded-lg shadow-md shadow-gray-500 w-full sm:max-w-sm mx-auto relative"
                        onClick={(e)=>e.stopPropagation()}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1, transition: { duration: 0.4 } }}>
                        <h3 className="text-center text-gray-900 mb-3 text-lg font-bold break-words">
                            Comunicate por whatsapp <i className="fa-brands fa-whatsapp text-2xl ml-2"></i>
                        </h3>
                        <div>
                        {contactos.map(contacto =>
                            <article
                                key={contacto.nombre}
                                className="flex items-center py-2 border-b-[1px] border-b-gray-400 last:border-b-0">
                                <p className="w-2/3 pl-3 break-words mr-4">
                                    {contacto.nombre}
                                </p>
                                <div className="w-1/3 flex justify-end">
                                    <a
                                        className="rounded-xl text-white font-medium bg-[#36BB68] px-4 py-1 mr-3 hover:bg-[#06a543] shadow-sm shadow-gray-800 transition-colors duration-200 cursor-pointer"
                                        href={`https://wa.me/${contacto.telefono}?text=Hola%20mi%20nombre%20es`}
                                        target="_blank"
                                        title="Enviar mensaje por whatsapp"
                                        rel="noopener noreferrer">
                                        mensaje
                                    </a>
                                </div>
                            </article>
                            )}
                        </div>
                    </motion.div>
                </div>
            }
            
        </>
    )
};

export default Whatsapp;