import { motion } from 'framer-motion';
import { useAlert } from '@/context/alertContext';
import { usePaginacion } from '@/hooks/usePaginacion';
import { getFotos, getFotosPorFecha } from '@/services/galeriaServices';
import FotoCard from '@/components/galeria/fotoCard';
import ControlPagina from '@/components/otros/controlPagina';

const ListaFotos = ({ fechaDesde, fechaHasta }) => {

    const { mostrarAlert } = useAlert();
    
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
            if (fechaDesde && fechaHasta) {
                return getFotosPorFecha(fechaDesde, fechaHasta, page, 21);
            }
            return getFotos(page, 21);
        },
        mostrarAlert,
            1,
            21,
        [fechaDesde, fechaHasta]
    );
    
    return (
        <>
        <section>
            {cargando ? <h6>Cargando...</h6> : (datos.length > 0 ?
                    <motion.div
                        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 w-full justify-center'
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
                            <div key={dato.id}>
                                <FotoCard
                                    foto={dato.url}
                                    evento={dato.evento}
                                    fecha={dato.fecha} />
                            </div>
                        )
                    }
                </motion.div>

                : <h6>No hay fotos para mostrar</h6>)}
        </section>

        {!cargando && datos.length > 0 &&
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

export default ListaFotos;