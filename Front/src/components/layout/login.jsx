
import { useState, useRef, useEffect } from 'react';
import BotonPrimario from '@/components/botones/primario';
import BotonSecundario from '@/components/botones/secundario';
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputError from '@/components/otros/inputError';
import { useAlert } from '@/context/alertContext';

const Login = ({clase}) => {

    const { mostrarAlert } = useAlert();
    const [abrirModal, setAbrirModal] = useState(false);
    const [ingresando, setIngresando] = useState(false);

    const modalRef = useRef();

    const validationSchema = Yup.object({
        usuario: Yup.string()
            .max(50, "El nombre de usuario ingresado debe ser más corto")
            .required("Ingresá el nombre de usuario"),
        password: Yup.string()
            .max(50, "La contraseña ingresada debe ser más corta")
            .required("Ingresá la contraseña")
    });

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (datos) => {
        setIngresando(true);
        mostrarAlert('Función aún no disponible');
        console.log(datos);
        reset();
        setIngresando(false);
        setAbrirModal(false);
    };

    useEffect(() => {
        const cerrarModal = (evento) => {
            if (abrirModal && modalRef.current && !modalRef.current.contains(evento.target)) setAbrirModal(false)
        }
        
        document.addEventListener('mousedown', cerrarModal);
        return () => document.removeEventListener('mousedown', cerrarModal);
    }, [abrirModal, setAbrirModal])

    return (
        <>
            <article className={clase && clase}>
                <button
                    className="border-none text-[14px] md:text-lg text-gray-600 hover:underline active:underline cursor-pointer"
                    title='Ingresá como administrador'
                    onClick={() => setAbrirModal(true)}>
                    <span>Ingresar </span>
                    <i className="fa-solid fa-wrench"></i>
                </button>
            </article>
            {abrirModal &&
                <section className='fixed inset-0 bg-black/70 backdrop-blur-sm z-60 flex items-center justify-center px-2'>
                    <motion.div
                        className="bg-gray-300 p-4 rounded-lg shadow-md shadow-gray-500 border-2 border-[#6E1538] w-full sm:max-w-sm mx-auto relative"
                        ref={modalRef}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1, transition: { duration: 0.4 } }}>
                        <h2 className="text-xl text-center text-gray-900 font-bold mb-4">Inicie sesión como administrador</h2>
                        <form
                            className='flex flex-col'
                            onSubmit={handleSubmit(onSubmit)}>
                            <article className="flex flex-col mb-2">
                                <label
                                    className="font-medium text-start"
                                    htmlFor="usuario">Usuario:</label>
                                <input
                                    {...register("usuario")}
                                    className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 ${errors.usuario ? 'border-red-600' : 'border-[#858f7b]'}`}
                                    type="text" />
                                {errors.usuario && <InputError mensaje={errors.usuario.message} />}
                            </article>
                            <article className="flex flex-col mb-2">
                                <label
                                    className="font-medium text-start"
                                    htmlFor="password">Contraseña:</label>
                                <input
                                    {...register("password")}
                                    className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 ${errors.password ? 'border-red-600' : 'border-[#858f7b]'}`}
                                    type="text" />
                                {errors.password && <InputError mensaje={errors.password.message} />}
                            </article>
                            <article className='flex justify-center mt-6 md:mt-8 gap-2'>
                                <BotonSecundario
                                    tipo='reset'
                                    texto='Cancelar'
                                    clase='w-full rounded-md'
                                    accion={() => setAbrirModal(false)} />
                                <BotonPrimario
                                    tipo='submit'
                                    texto={ingresando ? <><span>Ingresando </span><i className="fa-solid fa-spinner fa-spin"></i></> : 'Ingresar'}
                                    clase='w-full rounded-md'
                                    deshabilitado={ingresando ? true : false}/>
                            </article>
                            
                        </form>
                    </motion.div>

                </section>}
        </>
        
    )
};

export default Login;