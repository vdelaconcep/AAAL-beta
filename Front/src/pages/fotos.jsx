import { useEffect, useState } from "react";
import { getFotos, getFotosPorFecha, getEventos } from '@/services/galeriaServices';
import ListaElementos from "@/components/galeria/listaElementos";
import EventoCard from "@/components/galeria/eventoCard";
import FotoCard from "@/components/galeria/fotoCard";
import Selector from "@/components/botones/selector"


const Fotos = () => {

    const [show, setShow] = useState('todas');

    const funcionGet = show === 'evento' ? getEventos : getFotos;
    const Card = show === 'evento' ? EventoCard : FotoCard;

    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    return (
        <main className="h-full bg-white py-5 md:py-6 flex flex-col items-center px-4">
            <h1 className="font-bold italic text-xl md:text-2xl mb-3">Galería de Fotos</h1>
            <section className="mb-4 w-full flex gap-1">
                <Selector
                    clase='flex-1 text-sm md:text-md lg:text-lg'
                    texto='ver todas'
                    seleccionado={show === 'todas'}
                    accion={() => setShow('todas')} />
                <Selector
                    clase='flex-1 text-sm md:text-md lg:text-lg'
                    texto='por evento'
                    seleccionado={show === 'evento'}
                    accion={() => setShow('evento')}/>
                <Selector
                    clase='flex-1 text-sm md:text-md lg:text-lg'
                    texto='buscar'
                    seleccionado={show === 'buscar'}
                    accion={() => setShow('buscar')}/>
            </section>
            {(show === 'todas' || show === 'evento' || (show === 'buscar' && fechaDesde && fechaHasta)) ?
                <ListaElementos
                    key={show}
                    funcionGet={funcionGet}
                    funcionGetPorFecha={getFotosPorFecha}
                    fechaDesde={show === 'buscar'? fechaDesde : null}
                    fechaHasta={show === 'buscar' ? fechaHasta : null}
                    limit={show === 'evento' ? 11 : 21}
                    Card={Card} /> : ''}
        </main>
    );
};

export default Fotos;