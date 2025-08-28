
import roher from "../assets/img/auspiciantes/roher.jpg";
import abcelectro from "../assets/img/auspiciantes/abcelectro.jpg";
import gvelectro from "../assets/img/auspiciantes/gvelectro.jpg";
import madersul from "../assets/img/auspiciantes/mader_sul.jpg";
import jotabe from "../assets/img/auspiciantes/jotabe.jpg";

const Auspiciantes = () => {
    const slides = [
        { id: 1, src: roher, alt: "Roher materiales eléctricos", link: null },
        { id: 2, src: abcelectro, alt: "ABC electro", link: "https://electroabc.com.ar/" },
        { id: 3, src: gvelectro, alt: "GV electro", link: "https://electrogv.com.ar/" },
        { id: 4, src: madersul, alt: "Mader-Sul S.R.L.", link: "https://www.madersul.com.ar/" },
        { id: 5, src: jotabe, alt: "Creaciones Jotabe", link: null },
    ];

    // duplicamos para continuidad
    const logos = [...slides, ...slides];

    return (
        <section className="fondo-granate p-2">
            <p className="text-center text-lg text-white font-medium italic pb-1 text-shadow-gray-900 text-shadow-2xs">
                Nos acompañan:
            </p>
            <div className="bg-white py-3 rounded-xl overflow-hidden">
                <div className="marquee flex">
                    {logos.map((slide, i) =>
                        slide.link ? (
                            <a key={i} href={slide.link} target="_blank" rel="noopener noreferrer">
                                <img src={slide.src} alt={slide.alt} className="h-20 mx-20 rounded-xl" />
                            </a>
                        ) : (
                            <img key={i} src={slide.src} alt={slide.alt} className="h-20 mx-20 rounded-xl" />
                        )
                    )}
                </div>
            </div>
        </section>
    );
};


export default Auspiciantes;


