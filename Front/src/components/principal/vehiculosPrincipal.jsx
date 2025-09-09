import { motion } from "framer-motion";
import BotonPrimario from "../botones/primario";
import imagen1 from '../../assets/img/vehiculos/foto1.jpg';
import imagen2 from '../../assets/img/vehiculos/foto2.jpg';
import imagen3 from '../../assets/img/vehiculos/foto-3.jpg';
import imagen4 from '../../assets/img/vehiculos/foto-4.jpg';
import imagen5 from '../../assets/img/vehiculos/foto-5.jpg';
import imagen6 from '../../assets/img/vehiculos/foto-6-2.jpg';

const VehiculosPrincipal = () => {

    const vehiculos = [imagen1, imagen2, imagen3, imagen4, imagen5, imagen6];

    return (
        <section className="bg-[#DECBA0] border-b-[2px] border-b-[#bdad89] pt-1 w-full md:pt-3 pb-4 md:pb-5 overflow-hidden">
            <h1 className="pl-4 md:pl-8 mb-2 md:mb-5 pt-3 md:pt-4 font-bold text-lg md:text-xl italic text-gray-900">Nuestros vehículos</h1>

            <div className="flex flex-wrap">
                {vehiculos.map((n, i) => {

                    const fotoPar = (i % 2 === 0);

                    return (
                        <motion.article
                            className="w-1/2 py-1 md:pb-7 px-4 md:px-8 even:pl-1 md:even:pl-4 odd:pr-1 md:odd:pr-4"
                            key={i}
                            initial={{ opacity: 0, x: fotoPar ? -30 : 30 }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}>
                            <img
                                src={n}
                                alt={`foto-${i + 1}`}
                                className="rounded-xl shadow-sm  shadow-gray-900 md:cursor-pointer md:hover:shadow-md"
                            />
                        </motion.article>
                    );
                })}
            </div>
            <article className="flex justify-center">
                <BotonPrimario
                    tipo='button'
                    texto='ver más'
                    clase='px-6 md:px-10 mt-4' />
            </article>
        </section>
    );
};

export default VehiculosPrincipal;