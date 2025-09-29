import BotonPrimario from "@/components/botones/primario";
import aniversario from '@/assets/img/novedades_25aniversario.jpg';
import { motion } from "framer-motion";

const NovedadesPrincipal = () => {
    return (
        <section className="bg-[#DECBA0] border-b-[2px] border-b-[#bdad89] md:bg-[#A0AB94] md:border-b-[#858f7b] w-full pt-1 md:pt-3 pb-4 md:pb-5">

            <h1 className="pl-4 md:pl-8 mb-2 md:mb-5 pt-3 md:pt-4 font-bold text-lg md:text-xl italic text-gray-900">Novedades</h1>
            <article className="flex flex-col items-center px-4 md:pl-8">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}>
                    <img src={aniversario} alt="25 aniversario" className="w-full rounded-lg shadow-sm shadow-gray-900" />
                </motion.div>
                <BotonPrimario
                    tipo='button'
                    texto='ver más'
                    clase='px-5 md:px-10 mt-4' />
            </article>

        </section>
    );
};

export default NovedadesPrincipal;