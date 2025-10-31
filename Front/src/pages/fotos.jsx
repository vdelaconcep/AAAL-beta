import { useState, useEffect } from "react";
import ListaElementos from "@/components/galeria/listaElementos";
import Busqueda from "@/components/galeria/busqueda";
import Selector from "@/components/botones/selector";
import * as ToggleGroup from '@radix-ui/react-toggle-group';


const Fotos = () => {

    const [show, setShow] = useState('todas');

    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    const toggleItemClass = 'py-2 rounded-md text-sm font-medium transition-colors data-[state=on]:bg-white data-[state=on]:text-gray-900 data-[state=on]:shadow-sm data-[state=off]:text-gray-600 data-[state=off]:hover:text-gray-900 focus:outline-none w-full cursor-pointer focus:cursor-default focus:border-2 focus:border-[#6B9795]'

    const handleBusqueda = (desde, hasta) => {
        setFechaDesde(desde);
        setFechaHasta(hasta);
    };

    useEffect(() => {
        setFechaDesde('');
        setFechaHasta('');
    }, [show]);

    return (
        <main className="h-full bg-white py-7 md:py-10 flex flex-col items-center px-4">
            <h1 className="font-bold italic text-xl md:text-2xl mb-5 md:mb-9">Galería de Fotos</h1>
            <ToggleGroup.Root
                type="single"
                value={show}
                onValueChange={(value) => {
                    if (value) setShow(value)
                }}
                className="inline-flex rounded-lg bg-gray-200 p-1 gap-1 w-full mb-4 md:mb-7">
                <ToggleGroup.Item value="todas" className={toggleItemClass}>Ver todas</ToggleGroup.Item>
                <ToggleGroup.Item value="evento" className={toggleItemClass}>Por evento</ToggleGroup.Item>
                <ToggleGroup.Item value="buscar" className={toggleItemClass}>Por fecha</ToggleGroup.Item>
            </ToggleGroup.Root>

            {show === 'buscar' &&
                <Busqueda
                onBuscar={handleBusqueda}
                clase='mb-5'/>
            }

            {(show === 'todas' || show === 'evento' || (show === 'buscar' && fechaDesde && fechaHasta)) ?
                <ListaElementos
                    key={show}
                    tipo={show}
                    fechaDesde={show === 'buscar'? fechaDesde : null}
                    fechaHasta={show === 'buscar' ? fechaHasta : null} /> : ''}
        </main>
    );
};

export default Fotos;