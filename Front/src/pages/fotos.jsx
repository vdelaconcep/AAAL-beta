import { useState } from "react";
import ListaFotos from "@/components/galeria/listaFotos";


const Fotos = () => {

    const [show, setShow] = useState('todas');

    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    return (
        <main className="bg-white py-5 md:py-10 flex flex-col items-center px-4">
            <h1 className="font-bold italic text-xl md:text-2xl mb-3">Galería de Fotos</h1>
            <section className="mb-3">
                <button onClick={()=> setShow('todas')}>Todas</button>
                <button onClick={() => setShow('eventos')}>por evento</button>
                <button onClick={() => setShow('busqueda')}>Buscar</button>
            </section>
            {show === 'todas' ?
                <ListaFotos fechaDesde={null} fechaHasta={null} /> : ''}

        </main>

    );
};

export default Fotos;