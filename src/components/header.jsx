import logo from '../assets/img/logo-asociacion-automoviles-antiguos-lanus-e1536856848852-transformed.png';
import Login from './login';
import { Link } from "react-router-dom";

const Header = () => {

    // Tamaño de letra del título (responsive)
    const textoTitulo = 'text-[1.1rem] sm:text-4xl md:text-5xl xl:text-[3.5rem]'
    const primeraLetraTitulo = 'text-[1.3rem] sm:text-[2.5rem] md:text-[3.25rem] xl:text-[3.75rem]'

    return (
        <header className='fondo-granate px-4 pb-2'>
            <Login />
            <div className='flex text-white justify-center'>
                <article className='flex justify-center w-1/3 md:w-1/4 mr-1'>
                    <Link to="/">
                        <img className="relative z-50 aspect-ratio:1/1 max-h-[220px]" src={logo} alt="Logo Asociacion Automoviles Antiguos de Lanus" />
                    </Link>
                </article>
                
                <section className='flex flex-col items-center justify-center text-center w-2/3 md:w-3/4 ml-1'>
                    <h2 className={`${textoTitulo} font-medium mrAlex text-shadow-lg text-shadow-black`}>
                        <span className={primeraLetraTitulo}>A</span>SOCIACION DE <span className={primeraLetraTitulo}>A</span>UTOMOVILES <span className={primeraLetraTitulo}>A</span>NTIGUOS DE <span className={primeraLetraTitulo}>L</span>ANUS
                    </h2>
                    <h5 className='text-center italic text-[0.7rem] sm:text-sm md:text-md lg:text-lg mt-1 texto-crema'>Fundada el 24 de septiembre del 2000</h5>
                </section>
            </div>
        </header>
    );
};

export default Header;