const MiembroComision = ({ fondo, cargo, nombres }) => {
    return (
        <article className="bg-[#DECBA0] rounded-lg overflow-hidden shadow-xs shadow-gray-800 font-medium flex-1">
            <p className={`bg-[${fondo}] text-white text-center text-shadow-xs text-shadow-gray-800`}>{cargo}</p>
            {nombres.map(nombre =>
                <div className="py-1 text-center">
                    <p>{nombre}</p>
                </div>
            )}
        </article>
    );
};

export default MiembroComision;