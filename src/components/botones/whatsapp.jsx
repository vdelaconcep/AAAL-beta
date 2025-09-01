import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BotonTransparente from "./transparente";

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

        const refs = [modalRef, btnRef];

        const cerrarModal = (evento) => {
            if (mostrarContactos && !refs.some(ref => ref.current?.contains(evento.target))
            ) setMostrarContactos(false);
        };

        const cerrarModalEsc = (evento) => {
            if (mostrarContactos && evento.key === "Escape") setMostrarContactos(false);
        };

        document.addEventListener('click', cerrarModal);
        document.addEventListener('keydown', cerrarModalEsc);

        return () => {
            document.removeEventListener('click', cerrarModal);
            document.addEventListener('keydown', cerrarModalEsc);
        };

    }, [mostrarContactos, setMostrarContactos]);

    return (
        <section>
            <button
                className="fixed bottom-4 right-5 bg-[#36BB68] text-white px-3 pt-[10px] pb-[7px] rounded-full shadow-md shadow-gray-900 z-40 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-108"
                ref={btnRef}
                onClick={() => setMostrarContactos(true)}>
                    <i className="fa-brands fa-whatsapp text-4xl"></i>
            </button>
            {mostrarContactos &&
                <div className='fixed inset-0 bg-black/70 backdrop-blur-sm z-60 flex items-center justify-center'>
                    <motion.div
                        className="bg-[#DECBA0] border-2 border-[#6E1538] px-2 md:px-6 rounded-lg shadow-md shadow-gray-500 max-w-[300px] md:max-w-md mx-auto relative"
                        ref={modalRef}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1, transition: { duration: 0.4 } }}>
                        <h3 className="text-center pt-4 mb-5 text-lg font-bold break-words text-shadow-2xs text-shadow-gray-600">
                            Comunicate por whatsapp <i className="fa-brands fa-whatsapp text-2xl ml-2"></i>
                        </h3>
                        <div>
                        {contactos.map(contacto =>
                            <article
                                key={contacto.nombre}
                                className="flex py-3 border-b-[1px] border-b-gray-400 last:border-b-0">
                                <p className="w-2/3 pl-3 break-words mr-4">
                                    {contacto.nombre}
                                </p>
                                <div className="w-1/3 flex justify-end">
                                    <a
                                        className="rounded-xl text-white font-medium bg-[#36BB68] px-4 py-1 mr-3 hover:bg-[#06a543] hover:shadow-lg transition-colors duration-200"
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
                        <div className="flex justify-center mt-1 mb-2">
                            <BotonTransparente
                                texto={<><i className="fa-solid fa-arrow-left"></i> <span className="ml-1">volver</span></>}
                                clase='px-4 text-[#6E1538]'
                                accion={() => setMostrarContactos(false)} />
                        </div>
                    </motion.div>
                </div>
            }
        </section>
    )
};

export default Whatsapp;