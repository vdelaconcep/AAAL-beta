import { useState } from 'react';
import Selector from '@/components/botones/selector'

const NuestrosVehiculos = () => {
    const [show, setShow] = useState('');
    return (
        <main className="h-full bg-white py-7 md:py-10 flex flex-col items-center px-4">
            <h1 className="font-bold italic text-xl md:text-2xl mb-5 md:mb-9">Nuestros Vehículos</h1>
            <section className="mb-4 md:mb-7 w-full flex gap-1">
                <Selector
                    clase='flex-1 text-sm md:text-md lg:text-lg'
                    texto='Ver todos'
                    seleccionado={show === 'todos'}
                    accion={() => setShow('todos')} />
                <Selector
                    clase='flex-1 text-sm md:text-md lg:text-lg'
                    texto='Por marca'
                    seleccionado={show === 'porMarca'}
                    accion={() => setShow('porMarca')}/>
                <Selector
                    clase='flex-1 text-sm md:text-md lg:text-lg'
                    texto='Por año'
                    seleccionado={show === 'porAnio'}
                    accion={() => setShow('porAnio')}/>
            </section>
        </main>
    );
};

export default NuestrosVehiculos;