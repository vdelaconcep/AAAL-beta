import { useState, useEffect, useRef } from 'react';

export const usePaginacion = (fetchFunction, mostrarAlert, paginaInicial = 1, limit = 20, dependencias = []) => {

    const [datos, setDatos] = useState([]);
    const [cacheDatos, setCacheDatos] = useState({});
    const [cargando, setCargando] = useState(true);
    const [pagina, setPagina] = useState(paginaInicial);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [accion, setAccion] = useState(null);
    const cargandoRef = useRef(new Set());
    const forceReload = useRef(0);

    useEffect(() => {
        setCacheDatos({});
        setDatos([]);
        setPagina(1);
        setCargando(true);
        cargandoRef.current.clear();
        forceReload.current++;
    }, dependencias);

    const traerDatos = async (numPagina) => {

        if (cacheDatos[numPagina]) return;

        if (cargandoRef.current.has(numPagina)) return;

        cargandoRef.current.add(numPagina);

        try {
            const res = await fetchFunction(numPagina, limit);

            if (res.status !== 200) {
                const mensajeAlert = `Error al obtener datos ${res.statusText}`;
                mostrarAlert(mensajeAlert);
                setCargando(false);
                return;
            };

            setTotalPaginas(res.data.paginacion.totalPages);
            setCacheDatos(prev => ({
                ...prev,
                [numPagina]: res.data.rows
            }));

            if (numPagina === pagina) {
                setDatos(res.data.rows);
                setCargando(false);
            }

        } catch (err) {
            const mensajeAlert = `Error al obtener datos: ${err.response?.data?.error || err.message || 'Error desconocido'}`;
            mostrarAlert(mensajeAlert);
            setCargando(false);
            return;
        } finally {
            cargandoRef.current.delete(numPagina);
        }
    };

    useEffect(() => {
        if (cacheDatos[pagina]) {
            setDatos(cacheDatos[pagina]);
            setCargando(false);
        }
    }, [pagina, cacheDatos]);

    useEffect(() => {

        const cargarPaginas = async () => {
            if (!cacheDatos[pagina]) {
                setCargando(true);
            }

            await traerDatos(pagina);

            if (pagina > 1) {
                traerDatos(pagina - 1);
            }

            if (totalPaginas && pagina < totalPaginas) {
                traerDatos(pagina + 1);
            }
        };

        cargarPaginas();
    }, [pagina, totalPaginas, forceReload.current]);

    useEffect(() => {
        const paginasAMantener = new Set([
            pagina - 1,
            pagina,
            pagina + 1
        ].filter(p => p >= 1 && p <= totalPaginas));

        setCacheDatos(prev => {
            const nuevoCache = {};
            paginasAMantener.forEach(p => {
                if (prev[p]) nuevoCache[p] = prev[p];
            });
            return nuevoCache;
        });
    }, [pagina, totalPaginas]);

    return {
        datos,
        cargando,
        pagina,
        setPagina,
        totalPaginas,
        accion,
        setAccion
    };
};