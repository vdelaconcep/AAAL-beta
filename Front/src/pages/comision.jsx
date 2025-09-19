import { obtenerComision } from "../services/comisionServices";
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Alert from '../components/otros/alert'

const Comision = () => {

    const [notificacion, setNotificacion] = useState('');
    const [comision, setComision] = useState({});
    const [abrirModal, setAbrirModal] = useState(false);
    const [cargando, setCargando] = useState(false);

    const obtenerLista = async () => {
        try {
            setCargando(true);
            const res = await obtenerComision();

            if (res.status !== 200) {
                setNotificacion(`Error al obtener los datos: ${res.statusText}`);
                return (setAbrirModal(true));
            }

            setComision(res.data[0]);
        } catch (err) {
            setNotificacion(`Error al obtener datos: ${err.response.data.error}`);
            setAbrirModal(true);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        obtenerLista()
    }, []);
    

    return (
        <section className="bg-amber-100 py-5 md:py-10 flex flex-col items-center px-4">
            <div className="text-gray-900 text-center font-bold italic pb-5">
                <h1 className="text-xl md:text-2xl">Comisión directiva</h1>
                {(Object.keys(comision).length > 0) && <h3 className="text-s md:text-lg">{`Período ${comision.periodo} - ${comision.periodo + 1}`}</h3>}
            </div>
            

            {cargando && <p>Cargando...</p>}

            {(Object.keys(comision).length > 0) ? (
                
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="flex flex-col w-full md:max-w-[450px] items-center text-[13px] md:text-[16px]">
                    <article className="bg-[#DECBA0] w-full rounded-lg overflow-hidden shadow-xs shadow-gray-800 font-medium mb-4">
                        <p className="bg-[#6E1538] text-white text-center text-shadow-xs text-shadow-gray-800">Presidente</p>
                        <p className="py-1 text-center">{comision.presidente}</p>
                    </article>
                    <article className="bg-[#DECBA0] w-full rounded-lg overflow-hidden shadow-xs shadow-gray-800 font-medium mb-4">
                        <p className="bg-[#6B9795] text-white text-center text-shadow-xs text-shadow-gray-800">Vicepresidente</p>
                        <p className="py-1 text-center">{comision.vicepresidente}</p>
                    </article>
                    <div className="flex gap-2 mb-4 w-full">
                        <article className="bg-[#DECBA0] flex-1 rounded-lg overflow-hidden shadow-xs shadow-gray-800 font-medium">
                            <p className="bg-[#A0AB94] text-white text-center text-shadow-xs text-shadow-gray-800">Secretario</p>
                            <p className="py-1 text-center">{comision.secretario}</p>
                        </article>
                        <article className="bg-[#DECBA0] flex-1 rounded-lg overflow-hidden shadow-xs shadow-gray-800 font-medium">
                            <p className="bg-[#A0AB94] text-white text-center text-shadow-xs text-shadow-gray-800">Prosecretario</p>
                            <p className="py-1 text-center">{comision.prosecretario}</p>
                        </article>
                    </div>
                    <div className="flex gap-2 mb-4 w-full">
                        <article className="bg-[#DECBA0] flex-1 rounded-lg overflow-hidden shadow-xs shadow-gray-800 font-medium">
                            <p className="bg-[#6B9795] text-white text-center text-shadow-xs text-shadow-gray-800">Tesorero</p>
                            <p className="py-1 text-center">{comision.tesorero}</p>
                        </article>
                        <article className="bg-[#DECBA0] flex-1 rounded-lg overflow-hidden shadow-xs shadow-gray-800 font-medium">
                            <p className="bg-[#6B9795] text-white text-center text-shadow-xs text-shadow-gray-800">Protesorero</p>
                            <p className="py-1 text-center">{comision.protesorero}</p>
                        </article>
                    </div>
                    <div className="flex gap-2 mb-4 w-full">
                        <article className="bg-[#DECBA0] flex-1 rounded-lg overflow-hidden shadow-xs shadow-gray-800 font-medium">
                            <p className="bg-[#A0AB94] text-white text-center text-shadow-xs text-shadow-gray-800">Vocales titulares</p>
                            <p className="pt-1 text-center">{comision.vocaltitular1}</p>
                            <p className="text-center">{comision.vocaltitular2}</p>
                            <p className="pb-1 text-center">{comision.vocaltitular3}</p>
                        </article>
                        <article className="bg-[#DECBA0] flex-1 rounded-lg overflow-hidden shadow-xs shadow-gray-800 font-medium">
                            <p className="bg-[#A0AB94] text-white text-center text-shadow-xs text-shadow-gray-800">Vocales suplentes</p>
                            <p className="pt-1 text-center">{comision.vocalsuplente1}</p>
                            <p className="text-center">{comision.vocalsuplente2}</p>
                            <p className="pb-1 text-center">{comision.vocalsuplente3}</p>
                        </article>
                    </div>
                    <article className="bg-[#DECBA0] w-full rounded-lg overflow-hidden shadow-xs shadow-gray-800 font-medium mb-4">
                        <p className="bg-[#6B9795] text-white text-center text-shadow-xs text-shadow-gray-800">Revisores de cuentas</p>
                        <p className="pt-1 text-center">{comision.revisordecuentas1}</p>
                        <p className="text-center">{comision.revisordecuentas2}</p>
                        <p className="pb-1 text-center">{comision.revisordecuentas3}</p>
                    </article>
                </motion.div>
            ) : (
                !cargando && <p>No hay datos de comisión disponibles</p>
            )}
            {abrirModal &&
                <Alert
                mensaje={notificacion}
                setAbrirModal={setAbrirModal}
                importante={false}
                accionAdicional={() => setNotificacion('')} />}
        </section>
    )
};

export default Comision