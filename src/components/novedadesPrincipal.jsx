import BotonPrimario from "./botones/primario"
import aniversario from '../assets/img/novedades_25aniversario.jpg'
import { motion } from "framer-motion";

const NovedadesPrincipal = () => {
    return (
        <section className="bg-[#DECBA0] border-b-[2px] border-b-[#bdad89] w-full pt-1 md:pt-3 pb-4 md:pb-5">
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.8 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                className='flex flex-col items-center justify-center'>
                <h1 className="pl-4 mb-2 md:mb-5 pt-3 md:pt-4 font-bold text-lg md:text-xl italic text-gray-900">Novedades</h1>
                <article className="flex flex-col items-center px-4">
                    <img src={aniversario} alt="25 aniversario" className="w-full md:w-100 rounded-lg shadow-sm shadow-gray-900" />
                    <BotonPrimario
                        tipo='button'
                        texto='ver más'
                        clase='px-5 mt-4' />
                </article>
            </motion.div>
        </section>
    )
};

export default NovedadesPrincipal;