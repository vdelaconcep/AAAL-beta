import Auspiciantes from "../components/auspiciantes";
import Carousel from "../components/carousel";

const Bienvenidos = () => {

    return (
        <div>
            <article className="my-4">
                <Carousel />
            </article>
            <Auspiciantes />
        </div>
    );
};

export default Bienvenidos;
