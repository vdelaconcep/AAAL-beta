import { useAlert } from '@/context/alertContext';
import { usePaginacion } from '@/hooks/usePaginacion';
import { getAll, getFiltered } from '@/services/vehiculoServices';
import ControlPagina from '@/components/otros/controlPagina';
import Cargando from '@/components/otros/cargando';
import { motion } from 'framer-motion';
import ListaCard from '@/components/vehiculos/listaCard';

const ListaVehiculos = ({ filter, parametros }) => {

    const { marca, modelo, desde, hasta } = parametros

    const { mostrarAlert } = useAlert();

    const funcionGet = filter ? getFiltered : getAll;

    const limit = 10;

    const {
        datos,
        cargando,
        pagina,
        setPagina,
        totalPaginas,
        accion,
        setAccion
    } = usePaginacion(
        (page, limit) => {
            if (filter) return funcionGet(marca, modelo, desde, hasta, page, limit);
            return funcionGet(page, limit);
        },
        mostrarAlert,
        1,
        limit,
        [filter, marca, modelo, desde, hasta]
    );
    
    return (
        <>
            <section>
                {cargando ?
                    <Cargando /> : (datos.length > 0 ?
                        <motion.div
                            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 w-full justify-center mb-3`}
                            key={pagina}
                            {... (accion === 'siguiente' ? {
                                initial: { x: 100, opacity: 0 },
                                transition: { duration: 0.9 },
                                animate: { x: 0, opacity: 1 }
                            } : (accion === 'anterior' ? {
                                initial: { x: -100, opacity: 0 },
                                transition: { duration: 0.9 },
                                animate: { x: 0, opacity: 1 }
                            } : {
                                initial: { y: 50, opacity: 0 },
                                transition: { duration: 0.9 },
                                animate: { y: 0, opacity: 1 }
                            }))}>
                            {
                                datos.map(dato =>
                                    <ListaCard
                                        key={dato.id}
                                        vehiculo={dato} />
                                )
                            }

                        </motion.div>

                        : <h6>No hay vehículos para mostrar</h6>)}
            </section>

            {
                !cargando && datos.length > 0 &&
                <div className='py-4'>
                    <ControlPagina
                        pagina={pagina}
                        setPagina={setPagina}
                        totalPaginas={totalPaginas}
                        setAccion={setAccion} />
                </div>}
        </>
    );
};

export default ListaVehiculos;