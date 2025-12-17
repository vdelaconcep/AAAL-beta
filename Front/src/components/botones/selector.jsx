const Selector = ({ tipo, texto, accion, clase, seleccionado }) => {
    return (
        <button
            className={`border-b-[5px] ${seleccionado ? 'bg-[#c8d2d1] border-b-[#6B9795]' : 'bg-gray-200 border-b-gray-300'}  hover:bg-gray-300 active:bg-gray-300 font-medium cursor-pointer py-2 first-of-type:rounded-l-xl last-of-type:rounded-r-xl shadow-xs shadow-gray-500 ${clase && clase}`}
            type={tipo}
            onClick={accion && accion}
        >
            {texto}
        </button>
    );
};

export default Selector;