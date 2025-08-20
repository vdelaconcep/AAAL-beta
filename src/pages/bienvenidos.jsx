import Auspiciantes from "../components/auspiciantes";
import Carousel from "../components/carousel";
import Navegacion from "../components/navegacion";
import Historia from "../components/textos/historia";

const Bienvenidos = () => {

    return (
        <div>
            <Navegacion />

            <article className="my-4">
                <Carousel />
            </article>
            <Historia />
            <Auspiciantes />
        </div>
    );
};

export default Bienvenidos;
