import { motion } from "framer-motion";
import BotonPrimario from "../botones/primario";

const Alert = ({ mensaje, setAbrirModal, importante, accionAdicional }) => {
    return (
        <article className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center'>
            
            <motion.div className="bg-[#DECBA0] border-2 border-[#6E1538] p-4 md:p-6 rounded-lg shadow-md shadow-gray-500 max-w-[300px] md:max-w-md mx-auto relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1, transition: {duration: 0.4} }}
            >
                {importante && <h2 className="text-xl font-bold mb-4 text-center">IMPORTANTE</h2>}
                <p>{mensaje}</p>

                <div className='flex justify-center mt-5'>
                    <BotonPrimario
                        tipo='button'
                        texto='OK'
                        clase='px-6'
                        accion={() => {
                            setAbrirModal(false);
                            if (accionAdicional) accionAdicional
                        }} />
                </div>
                </motion.div>
            </article>
    );
};

export default Alert;