const BotonSecundario = ({ tipo, texto, accion, clase }) => {
    return (
        <button
            className={`bg-[#6B9795] hover:bg-[#5b817f] text-white font-medium cursor-pointer p-2 px-3 rounded-xl shadow-gray-900 shadow-sm ${clase && clase}`}
            type={tipo}
            onClick={accion && accion}
        >
            {texto}
        </button>
    );
};

export default BotonSecundario;