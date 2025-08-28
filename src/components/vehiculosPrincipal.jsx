import BotonPrimario from "./botones/primario";

const VehiculosPrincipal = () => {
    return (
        <section className="fondo-crema borde-inferior-crema-oscuro py-3 pt-4">
            <h1 className="pl-6 mb-5 pt-4 font-bold text-xl italic">Nuestros vehículos</h1>
            <article className="flex justify-center">
                <BotonPrimario
                    tipo='button'
                    texto='ver más'
                    clase='px-5'/>
            </article>
        </section>
    )
};

export default VehiculosPrincipal