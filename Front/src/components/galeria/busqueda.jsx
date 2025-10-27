import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import InputError from "@/components/otros/inputError";
import BotonSecundario from '@/components/botones/secundario';

const Busqueda = ({onBuscar, clase}) => {

    // Esquema de validación con yup
    const validationSchema = Yup.object({
        fechaDesde: Yup
            .string()
            .matches(
                /^\d{4}-\d{2}-\d{2}$/,
                'La fecha debe tener el formato YYYY-MM-DD'
            )
            .test('es-fecha-valida', 'La fecha no es válida', (value) => {
                const fecha = new Date(value);
                return !isNaN(fecha.getTime());
            })
            .required('La fecha "desde" es obligatoria'),

        fechaHasta: Yup
            .string()
            .matches(
                /^\d{4}-\d{2}-\d{2}$/,
                'La fecha debe tener el formato YYYY-MM-DD'
            )
            .test('es-fecha-valida', 'La fecha no es válida', (value) => {
                const fecha = new Date(value);
                return !isNaN(fecha.getTime());
            })
            .test(
                'fecha-posterior',
                'La fecha "hasta" debe ser posterior a la fecha "desde"',
                function (value) {
                    const { fechaDesde } = this.parent;
                    if (!fechaDesde || !value) return true;
                    return new Date(value) >= new Date(fechaDesde);
                }
            )
            .required('La fecha "hasta" es obligatoria')
    });

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm({
            resolver: yupResolver(validationSchema)
    });
    
    const onSubmit = (data) => {
        onBuscar(data.fechaDesde, data.fechaHasta);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`border-2 rounded-md border-gray-400 px-4 pt-2 pb-3 w-full sm:max-w-sm shadow-sm shadow-gray-700 ${clase && clase}`}>
            <h1 className="text-center font-bold mb-1">Buscar fotos por fecha</h1>
                <div className="flex sm:gap-2 mb-2">
                    <article className="flex flex-col w-1/2 pr-1 sm:pr-0">
                        <label
                            className="text-gray-500"
                            htmlFor="fechaDesde">Desde:</label>
                        <input
                            {...register("fechaDesde")}
                        className={`block bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 text-sm w-full ${errors.fechaDesde ? 'border-red-600' : 'border-[#858f7b]'}`}
                            type="date" />
                        {errors.fechaDesde && <InputError mensaje={errors.fechaDesde.message} />}
                    </article>
                    <article className="flex flex-col w-1/2 pl-1 sm:pl-0">
                        <label
                        className="text-gray-500"
                            htmlFor="fechaHasta">Hasta:</label>
                        <input
                            {...register("fechaHasta")}
                        className={`block bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 text-sm w-full ${errors.fechaHasta ? 'border-red-600' : 'border-[#858f7b]'}`}
                            type="date" />
                        {errors.fechaHasta && <InputError mensaje={errors.fechaHasta.message} />}
                    </article>
                </div>
                    <BotonSecundario
                        tipo='submit'
                        texto='Buscar'
                        clase='rounded-md w-full py-1' />
        </form>
)
};

export default Busqueda;