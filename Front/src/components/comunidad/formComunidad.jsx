import BotonPrimario from "@/components/botones/primario";
import BotonSecundario from "@/components/botones/secundario";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { enviarMensajeComunidad } from "@/services/comunidadService";
import InputError from '@/components/otros/inputError';
import BotonTransparente from "@/components/botones/transparente";
import { useAlert } from '@/context/alertContext';

const FormComunidad = ({setMostrarFormulario}) => {

    const { mostrarAlert } = useAlert();
    
    const [enviando, setEnviando] = useState(false);

    // Previsualización de imagen enviada
    const [preview, setPreview] = useState(null);

    // Formatos de imagen admitidos
    const admitedFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

    // Esquema de validación con Yup
    const validationSchema = Yup.object({
        nombre: Yup.string()
            .min(3, "El nombre debe tener más de 3 caracteres")
            .max(50, "El nombre no puede tener más de 50 caracteres")
            .required("Ingresá tu nombre"),
        relacion: Yup.string()
            .max(50, "Este campo no puede tener más de 50 caracteres")
            .required("Indicanos tu relación con el club"),
        titulo: Yup.string()
            .max(50, "El título no puede tener más de 50 caracteres")
            .required("Ingresá un título"),
        mensaje: Yup.string()
            .min(10, "El mensaje debe tener al menos 10 caracteres")
            .max(1000, "El mensaje no puede tener más de 1000 caracteres")
            .required("El mensaje no puede quedar vacío"),
        foto: Yup.mixed()
            .nullable()
            .test("fileSize", "La imagen es demasiado grande (máx. 2 MB)",
                value => {
                    if (!value?.[0]) return true;
                    return value[0].size <= 2 * 1024 * 1024;
                })
            .test("fileFormat", "Formato no admitido (solo JPG, PNG, WEBP)",
                value => {
                    if (!value?.[0]) return true;
                    return admitedFormats.includes(value[0].type);
                }),
    });

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data) => {

        const dataAEnviar = {... data, imagen: data.imagen[0]}
        try {
            setEnviando(true);
            const res = await enviarMensajeComunidad(dataAEnviar);
            if (res.status !== 200) {
                const mensajeAlert = `Error al enviar tu mensaje: ${res.statusText}`;
                mostrarAlert(mensajeAlert);
                return;
            }
            
            const mensajeAlert = 'Muchas gracias por compartir! Tu historia fue enviada a los administradores del sitio para su publicación';
            mostrarAlert(mensajeAlert);
            return;
    
        } catch (err) {
            const mensajeAlert = `Error al enviar tu mensaje: ${err.response?.data?.error || err.message || 'Error desconocido'}`;
            mostrarAlert(mensajeAlert);
            return;
        } finally {
            setEnviando(false)
        }
    };

    const fotoSeleccionada = watch("foto");

    useEffect(() => {
        if (fotoSeleccionada && fotoSeleccionada[0]) {
            const file = fotoSeleccionada[0];
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
        setPreview(null);
    }, [fotoSeleccionada]);

    return (
        <>
            <article className='fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex flex-col justify-start overflow-y-auto scrollbar-hide'>
            <div className="flex self-end my-2">
                    <BotonTransparente
                        tipo='button'
                        texto='X'
                        clase='text-white'
                        accion={() => {setMostrarFormulario(false)}} />
            </div>

            <motion.div className="bg-[#DECBA0] border-2 border-[#6E1538] p-4 rounded-lg shadow-md shadow-gray-500 max-w-[300px] md:max-w-md mx-auto relative text-gray-900 my-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1, transition: { duration: 0.4 } }}
            >
                <h1 className="text-xl italic font-bold mb-3">Compartí tu historia</h1>

                <h6 className="mb-2">Dejanos unas palabras sobre tu experiencia en el club: un pensamiento, un recuerdo o una anécdota especial que quieras contar</h6>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <article className="flex flex-col mb-2">
                        <label
                            className="font-medium"
                            htmlFor="nombre">Nombre:</label>
                        <input
                            {...register("nombre")}
                            className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 ${errors.nombre ? 'border-red-600' : 'border-[#858f7b]'}`}
                            type="text" />
                            {errors.nombre && <InputError mensaje={errors.nombre.message} />}
                    </article>

                    <article className="flex flex-col mb-2">
                        <label
                            className="font-medium"
                            htmlFor="relacion">Relación con el club:</label>
                        <input
                            {...register("relacion")}
                            className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 ${errors.relacion ? 'border-red-600' : 'border-[#858f7b]'}`}
                            type="text"
                            placeholder="Socio, amigo, fundador, etc." />
                            {errors.relacion && <InputError mensaje={errors.relacion.message} />}
                    </article>

                    <article className="flex flex-col mb-2">
                        <label
                            className="font-medium"
                            htmlFor="titulo">Título:</label>
                        <input
                            {...register("titulo")}
                            className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 ${errors.titulo ? 'border-red-600' : 'border-[#858f7b]'}`}
                            type="text"
                            placeholder="Ej: Historia de [tu nombre]" />
                            {errors.titulo && <InputError mensaje={errors.titulo.message} />}
                    </article>

                    <article className="flex flex-col mb-2">
                        <label
                            className="font-medium"
                            htmlFor="mensaje">Mensaje:</label>
                        <textarea
                            {...register("mensaje")}
                            className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 h-[120px] ${errors.mensaje ? 'border-red-600' : 'border-[#858f7b]'}`}
                            placeholder="(Hasta 1000 caracteres)" />
                            {errors.mensaje && <InputError mensaje={errors.mensaje.message} />}
                    </article>

                    <article className="flex flex-col mb-4">
                        <label
                            className="font-medium"
                            htmlFor="foto">Foto (opcional):</label>
                        <input
                            type="file"
                            accept={admitedFormats.join(",")}
                            {...register("foto")}
                            className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 ${errors.foto ? 'border-red-600' : 'border-[#858f7b]'}`} />
                            {errors.foto && <InputError mensaje={errors.foto.message} />}
                    </article>

                    {preview && (
                        <div className="mt-2">
                            <p className="text-gray-600 text-sm">Vista previa:</p>
                            <img
                                src={preview}
                                alt="Vista previa"
                                className="mt-1 max-h-48 rounded border"
                            />
                        </div>
                    )}
                    <article className="flex gap-2">
                        <BotonSecundario
                            tipo='button'
                            texto='Cancelar'
                            clase='w-1/2'
                            accion={() => {
                                reset();
                                setMostrarFormulario(false)
                            }} />
                        <BotonPrimario
                            tipo='submit'
                            texto={enviando ? <><span>Enviando </span><i className="fa-solid fa-spinner fa-spin"></i></> : 'Enviar'}
                            clase='w-1/2'
                            deshabilitado={enviando ? true : false} />
                    </article>
                </form>
            </motion.div>
            </article>

        </>
    );
};

export default FormComunidad;