const BotonPrimario = ({tipo, texto, accion, clase}) => {
    return (
        <button
            className={`bg-[#6E1538] hover:bg-[#4e0e28] text-white font-medium cursor-pointer p-2 px-3 rounded-xl shadow-gray-900 shadow-sm ${clase && clase}`}
            type={tipo}
            onClick={accion && accion}
        >
            {texto}
        </button>
    )
};

export default BotonPrimario;