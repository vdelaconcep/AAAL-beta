const BotonTransparente = ({ tipo, texto, accion, clase }) => {
    return (
        <button
            className={`font-medium cursor-pointer p-2 px-3 hover:text-shadow-2xs hover:text-shadow-gray-500 ${clase && clase}`}
            type={tipo}
            onClick={accion && accion}
        >
            {texto}
        </button>
    );
};

export default BotonTransparente;