import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import roher from '../assets/img/auspiciantes/roher.jpg';
import abcelectro from '../assets/img/auspiciantes/abcelectro.jpg';
import gvelectro from '../assets/img/auspiciantes/gvelectro.jpg';
import madersul from '../assets/img/auspiciantes/mader_sul.jpg';
import jotabe from '../assets/img/auspiciantes/jotabe.jpg';

const Auspiciantes = () => {
    const slides = [
        { src: roher, alt: "Roher materiales eléctricos", link: null },
        { src: abcelectro, alt: "ABC electro", link: "https://electroabc.com.ar/" },
        { src: gvelectro, alt: "GV electro", link: "https://electrogv.com.ar/" },
        { src: madersul, alt: "Mader-Sul S.R.L.", link: "https://www.madersul.com.ar/" },
        { src: jotabe, alt: "Creaciones Jotabe", link: null },
    ];

    return (
        <section className="fondo-granate p-2">
            <p className="text-center text-lg text-white font-semibold pb-1">Nos acompañan:</p>
            <div className="bg-white py-3 rounded-xl">
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    speed={5000}
                    className="py-4"
                    slidesOffsetBefore={500}
                >
                    {slides.concat(slides).map((slide, i) => (
                        <SwiperSlide key={i} className="flex justify-center">
                            {slide.link ? (
                                <a href={slide.link} target="_blank" rel="noopener noreferrer">
                                    <img src={slide.src} alt={slide.alt} className="h-20 m-1 rounded-xl" />
                                </a>
                            ) : (
                                <img src={slide.src} alt={slide.alt} className="h-20 m-1 rounded-xl" />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Auspiciantes;

