const BotonPrimario = ({tipo, texto, accion, clase}) => {
    return (
        <button
            className={`fondo-granate hover-granateOscuro text-white cursor-pointer p-2 px-3 rounded-xl shadow-gray-900 shadow-sm ${clase && clase}`}
            type={tipo}
            onClick={accion && accion}
        >
            {texto}
        </button>
    )
};

export default BotonPrimario;