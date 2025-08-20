const BotonSecundario = ({ tipo, texto, accion, clase }) => {
    return (
        <button
            className={`bg-sky-950 text-sky-400 hover:text-white cursor-pointer p-2 px-3 rounded ${clase && clase}`}
            type={tipo}
            onClick={accion && accion}
        >
            {texto}
        </button>
    );
};

export default BotonSecundario;