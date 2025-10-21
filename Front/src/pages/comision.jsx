import { obtenerComision } from "@/services/comisionServices";
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useAlert } from "@/context/alertContext";
import MiembroComision from "@/components/comision/miembroComision";

const Comision = () => {

    const { mostrarAlert } = useAlert();

    const [comision, setComision] = useState({});
    const [cargando, setCargando] = useState(false);

    const obtenerLista = async () => {
        try {
            setCargando(true);
            const res = await obtenerComision();

            if (res.status !== 200) {
                const mensajeAlert = `Error al obtener los datos: ${res.statusText}`;
                mostrarAlert(mensajeAlert);
                return;
            }

            setComision(res.data[0]);
            return;

        } catch (err) {
            const mensajeAlert = `Error al obtener datos: ${err.response?.data?.error || err.message || 'Error desconocido'}`;
            mostrarAlert(mensajeAlert);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        obtenerLista()
    }, []);
    

    return (
        <main className="bg-white py-5 md:py-6 flex flex-col items-center px-4">
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
                    <div className="w-full mb-4">
                        <MiembroComision
                            fondo='#6E1538' // Granate
                            cargo='Presidente'
                            nombres={[comision.presidente]} />
                    </div>
                    <div className="w-full mb-4">
                        <MiembroComision
                            fondo='#6B9795' // Celeste
                            cargo='Vicepresidente'
                            nombres={[comision.vicepresidente]} />
                    </div>
                    <div className="flex gap-2 mb-4 w-full">
                        <MiembroComision
                            fondo='#A0AB94' // Verde
                            cargo='Secretario'
                            nombres={[comision.secretario]} />
                        <MiembroComision
                            fondo='#A0AB94' // Verde
                            cargo='Prosecretario'
                            nombres={[comision.prosecretario]} />
                    </div>
                    <div className="flex gap-2 mb-4 w-full">
                        <MiembroComision
                            fondo='#6B9795' // Celeste
                            cargo='Tesorero'
                            nombres={[comision.tesorero]} />
                        <MiembroComision
                            fondo='#6B9795' // Celeste
                            cargo='Protesorero'
                            nombres={[comision.protesorero]} />
                    </div>
                    <div className="flex gap-2 mb-4 w-full">
                        <MiembroComision
                            fondo='#A0AB94' // Verde
                            cargo='Vocales titulares'
                            nombres={[comision.vocaltitular1, comision.vocaltitular2, comision.vocaltitular3]} />
                        <MiembroComision
                            fondo='#A0AB94' // Verde
                            cargo='Vocales suplentes'
                            nombres={[comision.vocalsuplente1, comision.vocalsuplente2, comision.vocalsuplente3]} />
                    </div>
                    <div className="flex gap-2 mb-4 w-full">
                    <MiembroComision
                        fondo='#6B9795' // Celeste
                        cargo='Revisores de cuentas'
                        nombres={[comision.revisordecuentas1, comision.revisordecuentas2, comision.revisordecuentas3]} />
                    </div>
                </motion.div>
            ) : (
                !cargando && <p>No hay datos de comisión disponibles</p>
            )}
        </main>
    )
};

export default Comision