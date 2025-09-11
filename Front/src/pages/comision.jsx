import { obtenerComision } from "../services/comisionServices";
import { useState, useEffect } from 'react';
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
            console.log(res.data[0])
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
        <section className="bg-white">
            <h1>Comisión directiva</h1>

            {cargando && <p>Cargando...</p>}

            {comision ? (
                <div>
                    {comision.presidente}
                </div>
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