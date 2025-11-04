import { useState } from 'react';
import BotonPrimario from '@/components/botones/primario';
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const NuestrosVehiculos = () => {

    const [filtrar, setFiltrar] = useState(false);
    const anios = Array.from({ length: 2025 - 1880 + 1 }, (_, i) => 1880 + i).reverse();

    const validationSchema = Yup.object({
        marca: Yup.string()
            .max(50, "La marca no puede tener más de 50 caracteres"),
        modelo: Yup.string()
            .max(50, "El modelo no puede tener más de 50 caracteres"),
    })

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
        resolver: yupResolver(validationSchema)
    });

    return (
        <main className="h-full bg-white py-7 md:py-10 flex flex-col items-center px-4">
            <h1 className="font-bold italic text-xl md:text-2xl mb-5 md:mb-9">Nuestros Vehículos</h1>
            <BotonPrimario
                clase='w-full sm:w-[300px]'
                texto={filtrar ? 'Ver todos' : 'Buscar'}
                accion={() => setFiltrar(prev => !prev)}
            />
            {filtrar &&
                <form
                    className='border-2 border-gray-500 rounded-xl my-5 overflow-hidden w-full md:w-auto'>
                    <div className='flex flex-col md:flex-row gap-2 mb-2 bg-gray-200 p-2'>
                        <article className="flex flex-col mb-2 w-full">
                            <label
                                className="font-medium"
                                htmlFor="marca">Marca:</label>
                            <input
                                {...register("marca")}
                                className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 ${errors.marca ? 'border-red-600' : 'border-[#858f7b]'}`}
                                type="text" />
                            {errors.marca && <InputError mensaje={errors.marca.message} />}
                        </article>
                        <article className="flex flex-col mb-2 w-full">
                            <label
                                className="font-medium"
                                htmlFor="modelo">Modelo:</label>
                            <input
                                {...register("modelo")}
                                className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 ${errors.modelo ? 'border-red-600' : 'border-[#858f7b]'}`}
                                type="text" />
                            {errors.modelo && <InputError mensaje={errors.modelo.message} />}
                        </article>
                    </div>
                    <p className='px-2 text-center'>Buscar por año</p>
                    <div className='flex gap-2 p-2'>
                        <article className="flex flex-col mb-2 w-full">
                            <label
                                className="font-medium"
                                htmlFor="desde">Desde:</label>
                            <select
                                {...register("desde")}
                                className="bg-[#bac7ad] focus:bg-amber-50 border-[1px] rounded-md px-2 py-1 border-[#858f7b]"
                            >
                                <option value="">Desde:</option>
                                {anios.map(anio => (
                                    <option key={anio} value={anio}>{anio}</option>
                                ))}
                            </select>
                        </article>
                        <article className="flex flex-col mb-2 w-full">
                            <label
                                className="font-medium"
                                htmlFor="hasta">Hasta:</label>
                            <select
                                {...register("hasta")}
                                className="bg-[#bac7ad] focus:bg-amber-50 border-[1px] rounded-md px-2 py-1 border-[#858f7b]"
                            >
                                <option value="">Hasta:</option>
                                {anios.map(anio => (
                                    <option key={anio} value={anio}>{anio}</option>
                                ))}
                            </select>
                        </article>
                    </div>
                    
                </form>
            }
            
        </main>
    );
};

export default NuestrosVehiculos;