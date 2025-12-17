const ListaCard = ({vehiculo}) => {
    return (
        <article className="bg-gradient-to-bl from-[#6B9795] to-[#8fc9c5] p-2 pb-3 border-2 border-gray-500 rounded-xl overflow-hidden shadow-sm shadow-gray-500">
            <img
                src={vehiculo.foto}
                alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                className="w-full rounded-lg border-1 border-gray-500" />
            
            <h4 className="font-bold text-lg">{`${vehiculo.marca} ${vehiculo.modelo}`}</h4>
            <h6>{`(${vehiculo.anio})`}</h6>
            <p className="font-medium">{vehiculo.descripcion}</p>
        </article>
    )
};

export default ListaCard;