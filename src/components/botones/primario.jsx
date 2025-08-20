const BotonPrimario = ({tipo, texto, accion, clase}) => {
    return (
        <button
            className={`bg-sky-500 text-white hover:bg-sky-400 cursor-pointer p-2 px-3 rounded ${clase && clase}`}
            type={tipo}
            onClick={accion && accion}
        >
            {texto}
        </button>
    )
};

export default BotonPrimario;