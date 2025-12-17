import { useState } from 'react';
import BuscarVehiculos from '@/components/vehiculos/buscarVehiculos';
import ListaVehiculos from '@/components/vehiculos/listaVehiculos';
import Selector from '@/components/botones/selector';

const NuestrosVehiculos = () => {

    const [filtrar, setFiltrar] = useState(false);
    const [busqueda, setBusqueda] = useState(false);

    const [parametros, setParametros] = useState({
        marca: "",
        modelo: "",
        desde: "",
        hasta: ""
    })

    const handleBusqueda = (parametrosBusqueda) => {
        setParametros(parametrosBusqueda)
        setBusqueda(true);
    };

    const mostrarLista = !filtrar || busqueda;

    return (
        <main className="h-full bg-white py-7 md:py-10 flex flex-col items-center px-4">
            <h1 className="font-bold italic text-2xl md:text-3xl mb-5 md:mb-9">Nuestros Vehículos</h1>

            <section className="mb-5 md:mb-7 w-full flex gap-1">
                <Selector
                    clase='flex-1 text-md md:text-lg'
                    texto='Ver todos'
                    seleccionado={!filtrar}
                    accion={() => setFiltrar(false)} />
                <Selector
                    clase='flex-1 text-md md:text-lg'
                    texto='Buscar'
                    seleccionado={filtrar}
                    accion={() => setFiltrar(true)} />
            </section>

            {filtrar &&
                <BuscarVehiculos
                onBuscar={handleBusqueda}
                valoresIniciales={parametros}
                clase='w-full max-w-[500px]'/>
            }

            {mostrarLista && 
                <ListaVehiculos
                filter={filtrar}
                parametros={parametros} />
            }
            
        </main>
    );
};

export default NuestrosVehiculos;