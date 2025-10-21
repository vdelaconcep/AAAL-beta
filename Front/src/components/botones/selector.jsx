const Selector = ({ tipo, texto, accion, clase, seleccionado }) => {
    return (
        <button
            className={`border-b-[4px] ${seleccionado ? 'border-b-[#6B9795]' : 'border-b-transparent'} bg-gray-100 hover:bg-gray-200 active:bg-gray-200 font-medium cursor-pointer py-2 ${clase && clase}`}
            type={tipo}
            onClick={accion && accion}
        >
            {texto}
        </button>
    );
};

export default Selector;