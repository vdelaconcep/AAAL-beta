import { motion } from "framer-motion";
import { useEffect } from "react";
import { useToast } from "@/context/toastContext";

const ToastComponent = () => {

    const { visible, textoToast, success, ocultarToast } = useToast();

    if (!visible) return null;

    useEffect(() => {
        const timer = setTimeout(() => {
            ocultarToast()
        }, 2500);

        return () => clearTimeout(timer)
    }, [visible])

    return (
        <article className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center'>

            <motion.div className="bg-[#DECBA0] border-2 border-[#6E1538] p-4 md:p-6 rounded-lg shadow-md shadow-gray-500 max-w-[300px] md:max-w-md mx-auto relative flex justify-center items-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1, transition: { duration: 0.4 } }}
            >
                <p className="text-gray-900">{textoToast}</p>

                {success &&
                    <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 52"
                        className="w-8 h-8 text-gray-900 align-middle"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                    >
                        <motion.path
                            d="M14 27l7 7 17-17"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                    </motion.svg>
                }

            </motion.div>
        </article>
    );
};

export default ToastComponent;