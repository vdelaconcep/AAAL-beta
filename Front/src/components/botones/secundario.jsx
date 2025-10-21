const BotonSecundario = ({ tipo, texto, accion, clase, seleccionado }) => {
    return (
        <button
            className={`${seleccionado ? 'bg-[#557977] text-[#81b4b1]' : 'bg-[#6B9795] hover:bg-[#5b817f] text-white cursor-pointer'} font-medium p-2 px-3 rounded-xl shadow-gray-900 shadow-sm ${clase && clase}`}
            type={tipo}
            onClick={accion && accion}
        >
            {texto}
        </button>
    );
};

export default BotonSecundario;