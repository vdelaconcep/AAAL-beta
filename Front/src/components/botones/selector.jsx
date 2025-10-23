const Selector = ({ tipo, texto, accion, clase, seleccionado }) => {
    return (
        <button
            className={`border-b-[5px] ${seleccionado ? 'border-b-[#6B9795]' : 'border-b-transparent'} bg-gray-200 hover:bg-gray-300 active:bg-gray-300 font-medium cursor-pointer py-2 rounded-xs ${clase && clase}`}
            type={tipo}
            onClick={accion && accion}
        >
            {texto}
        </button>
    );
};

export default Selector;