const ControlPagina = ({pagina, setPagina, totalPaginas, setAccion, mainRef}) => {
    return (
        <article className="flex">
            <button
                className={`${pagina <= 1 ? 'hidden' : 'cursor-pointer'}`}
                onClick={() => {
                    mainRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
                    setPagina(pagina - 1);
                    setAccion('anterior');
                }}
                disabled={pagina <= 1}><i className="fa-solid fa-arrow-left"></i></button>
            
            <h1 className="mx-5">{`Página ${pagina} de ${totalPaginas}`}</h1>
            <button
                className={`${pagina >= totalPaginas ? 'hidden' : 'cursor-pointer'}`}
                onClick={() => {
                    mainRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
                    setPagina(pagina + 1);
                    setAccion('siguiente');
                }}
                disabled={pagina >= totalPaginas}><i className="fa-solid fa-arrow-right"></i></button>
        </article>
    )
};

export default ControlPagina;