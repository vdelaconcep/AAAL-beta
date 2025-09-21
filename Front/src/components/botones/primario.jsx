const BotonPrimario = ({tipo, texto, accion, clase, deshabilitado}) => {
    return (
        <button
            className={`${deshabilitado ? 'bg-[#4e0e28] text-[#704858]' : 'bg-[#6E1538] text-white'}  hover:bg-[#4e0e28] font-medium cursor-pointer p-2 px-3 rounded-xl shadow-gray-900 shadow-sm ${clase && clase}`}
            type={tipo}
            onClick={accion && accion}
        >
            {texto}
        </button>
    )
};

export default BotonPrimario;