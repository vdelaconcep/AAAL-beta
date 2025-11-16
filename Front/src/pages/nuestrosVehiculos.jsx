import { useState, useEffect } from 'react';
import BotonPrimario from '@/components/botones/primario';
import BuscarVehiculos from '@/components/vehiculos/buscarVehiculos';
import ListaVehiculos from '@/components/vehiculos/listaVehiculos';
import { motion } from "framer-motion";

const NuestrosVehiculos = () => {

    const [filtrar, setFiltrar] = useState(false);

    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');

    const handleBusqueda = (marca, modelo, desde, hasta) => {
        setMarca(marca);
        setModelo(modelo);
        setDesde(desde);
        setHasta(hasta);
    };

    return (
        <main className="h-full bg-white py-7 md:py-10 flex flex-col items-center px-4">
            <h1 className="font-bold italic text-xl md:text-2xl mb-5 md:mb-9">Nuestros Vehículos</h1>
            <BotonPrimario
                clase='w-full sm:w-[300px]'
                texto={filtrar ? 'Ver todos' : 'Buscar'}
                accion={() => setFiltrar(prev => !prev)}
            />
            {filtrar &&
                <BuscarVehiculos
                onBuscar={handleBusqueda} />
            }

            <ListaVehiculos
                filter={filtrar}
                marca={marca}
                modelo={modelo}
                desde={desde}
                hasta={hasta}/>
            
        </main>
    );
};

export default NuestrosVehiculos;