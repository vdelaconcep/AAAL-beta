import BotonPrimario from "./botones/primario"

const NovedadesPrincipal = () => {
    return (
        <section className="fondo-celeste borde-inferior-celeste-oscuro w-full text-black py-3">
            <h1 className="pl-6 mb-5 pt-4 font-bold text-xl italic">Novedades</h1>
            <article className="flex justify-center">
                <BotonPrimario
                    tipo='button'
                    texto='ver más'
                    clase='px-5'/>
            </article>
        </section>
    )
};

export default NovedadesPrincipal;