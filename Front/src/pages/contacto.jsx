import BotonPrimario from "../components/botones/primario";
import BotonSecundario from "../components/botones/secundario";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { enviarMensaje } from "../services/mensajesServices";
import Toast from "../components/otros/toast";
import Alert from "../components/otros/alert";
import { useState } from "react";

const Contacto = () => {

    // Control de toast
    const [mostrarToast, setMostrarToast] = useState(false);

    // Control de alert
    const [mostrarAlert, setMostrarAlert] = useState(false);
    const [mensajeAlert, setMensajeAlert] = useState('');

    const [enviando, setEnviando] = useState(false);

    // Esquema de validación con Yup
    const validationSchema = Yup.object({
        nombre: Yup.string()
            .min(3, "El nombre debe tener más de 3 caracteres")
            .max(50, "El nombre no puede tener más de 50 caracteres")
            .required("Ingresá tu nombre"),
        email: Yup.string()
            .email("Debe ingresar un e-mail válido")
            .max(50, "El e-mail no puede tener más de 50 caracteres")
            .required("Ingresá tu dirección de e-mail"),
        telefono: Yup.string()
            .notRequired()
            .matches(/^[0-9]*$/, "Solo se permiten números")
            .test(
                "len",
                "El teléfono debe tener entre 8 y 15 dígitos",
                value => !value || (value.length >= 8 && value.length <= 15)
            ),
        asunto: Yup.string()
            .max(50, "El asunto no puede tener más de 50 caracteres")
            .required("Ingresá un asunto"),
        mensaje: Yup.string()
            .min(10, "El mensaje debe tener al menos 10 caracteres")
            .max(500, "El mensaje no puede tener más de 500 caracteres")
            .required("El mensaje no puede quedar vacío")
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    // Al enviar datos al formulario...
    const onSubmit = async (data) => {
        try {
            setEnviando(true);
            const res = await enviarMensaje(data);
            if (res.status !== 200) {
                setMensajeAlert(`Error al enviar tu mensaje: ${res.statusText}`);
                return setMostrarAlert(true);
            }

            return setMostrarToast(true);

        } catch (err) {
            setMensajeAlert(`Error al enviar tu mensaje: ${err.response?.data?.error || err.message || 'Error desconocido'}`);
            return setMostrarAlert(true);
        } finally {
            setEnviando(false)
        }
    };

    return (
        <section className="flex flex-col items-center bg-amber-100 py-5 md:py-10 px-4 text-gray-900">

            <div className="flex flex-col items-center mb-4">
                <h1 className="text-xl md:text-2xl font-bold italic">Contacto</h1>
                <h6 className="text-sm md:text-md">Escribinos un mensaje y te responderemos a la brevedad</h6>
            </div>

            <motion.form
                initial={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.8 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#A0AB94] px-2 py-3 rounded-xl shadow-md shadow-gray-800 text-md w-full md:max-w-[400px]">
                <article className="flex flex-col mb-2">
                    <label
                        className="font-medium"
                        htmlFor="nombre">Nombre:</label>
                    <input
                        {...register("nombre")}
                        className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 ${errors.nombre ? 'border-red-600' : 'border-[#858f7b]'}`}
                        type="text" />
                    {errors.nombre &&
                        <span className="text-xs text-amber-50 bg-[rgba(0,0,0,0.3)] px-2 py-1 rounded shadow w-full mt-1"><i className="fa-solid fa-triangle-exclamation"></i> {errors.nombre.message}</span>}
                </article>
                <article className="flex flex-col mb-2">
                    <label
                        className="font-medium"
                        htmlFor="email">E-mail:</label>
                    <input
                        {...register("email")}
                        className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 ${errors.email ? 'border-red-600' : 'border-[#858f7b]'}`}
                        type="email" />
                    {errors.email &&
                        <span className="text-xs text-amber-50 bg-[rgba(0,0,0,0.3)] px-2 py-1 rounded shadow w-full mt-1"><i className="fa-solid fa-triangle-exclamation"></i> {errors.email.message}</span>}
                </article>
                <article className="flex flex-col mb-2">
                    <label
                        className="font-medium"
                        htmlFor="telefono">Teléfono (opcional):</label>
                    <input
                        {...register("telefono")}
                        className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 ${errors.telefono ? 'border-red-600' : 'border-[#858f7b]'}`}
                        type="tel" />
                    {errors.telefono &&
                        <span className="text-xs text-amber-50 bg-[rgba(0,0,0,0.3)] px-2 py-1 rounded shadow w-full mt-1"><i className="fa-solid fa-triangle-exclamation"></i> {errors.telefono.message}</span>}
                </article>
                <article className="flex flex-col mb-2">
                    <label
                        className="font-medium"
                        htmlFor="asunto">Asunto:</label>
                    <input
                        {...register("asunto")}
                        className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 ${errors.asunto ? 'border-red-600' : 'border-[#858f7b]'}`}
                        type="text" />
                    {errors.asunto &&
                        <span className="text-xs text-amber-50 bg-[rgba(0,0,0,0.3)] px-2 py-1 rounded shadow w-full mt-1"><i className="fa-solid fa-triangle-exclamation"></i> {errors.asunto.message}</span>}
                </article>
                <article className="flex flex-col mb-4">
                    <label
                        className="font-medium"
                        htmlFor="mensaje">Mensaje:</label>
                    <textarea
                        {...register("mensaje")}
                        className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 h-[120px] ${errors.mensaje ? 'border-red-600' : 'border-[#858f7b]'}`} />
                    {errors.mensaje &&
                        <span className="text-xs text-amber-50 bg-[rgba(0,0,0,0.3)] px-2 py-1 rounded shadow w-full mt-1"><i className="fa-solid fa-triangle-exclamation"></i> {errors.mensaje.message}</span>}
                </article>
                <article className="flex gap-2">
                    <BotonSecundario
                        tipo='reset'
                        texto='Cancelar'
                        clase='w-1/2'
                        accion={() => reset()}/>
                    <BotonPrimario
                        tipo='submit'
                        texto={enviando ? <><span>Enviando </span><i className="fa-solid fa-spinner fa-spin"></i></> : 'Enviar'}
                        clase='w-1/2'
                        deshabilitado={enviando ? true : false} />
                </article>
            </motion.form>
            {mostrarToast &&
                <Toast
                    mensaje='Tu mensaje ha sido enviado'
                    setMostrarToast={setMostrarToast}
                    success={true}
                    accionAdicional={() => reset()} />}
            {mostrarAlert &&
                <Alert
                    mensaje={mensajeAlert}
                    setAbrirModal={setMostrarAlert}
                    importante={false}
                    accionAdicional={() => setMensajeAlert('')} />}

        </section>
        
    )
};

export default Contacto;