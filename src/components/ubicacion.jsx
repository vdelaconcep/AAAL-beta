import { motion } from "framer-motion";

const Ubicacion = () => {
    return (
        <section className="fondo-verde borde-inferior-verde-oscuro w-full pt-1 md:pt-3 pb-4 md:pb-5">
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.8 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
            >
                <h1 className="pl-4 mb-3 md:mb-5 pt-3 md:pt-4 font-bold text-lg md:text-xl italic text-white text-shadow-gray-900 text-shadow-2xs">Dónde estamos</h1>
                <article className="px-4 flex justify-center">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.7535495728057!2d-58.4176390334281!3d-34.68616902118912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccc60204be501%3A0xb24f60cfb640a203!2sViamonte%202615%2C%20B1824%20Valent%C3%ADn%20Alsina%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1756140255680!5m2!1ses!2sar" className="rounded-lg h-[200px] w-full md:w-100 shadow-sm shadow-gray-900" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </article>
            </motion.div>
        </section>
    )
};

export default Ubicacion;