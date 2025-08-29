import logo from '../assets/img/logo-asociacion-automoviles-antiguos-lanus-e1536856848852-transformed.png';
import Login from './login';
import { Link } from "react-router-dom";

const Header = () => {

    // Tamaño de letra del título (responsive)
    const textoTitulo = 'text-xl sm:text-4xl md:text-5xl xl:text-[3.5rem]'
    const primeraLetraTitulo = 'text-[1.5rem] sm:text-[2.5rem] md:text-[3.25rem] xl:text-[3.75rem]'

    return (
        <header className='fondo-granate'>
            <Login />
            <div className='flex text-white justify-center p-1 pt-0 md:p-2 md:h-50 md:pl-8 lg:pl-2 '>
                <article className='flex justify-center w-1/3 md:w-1/4'>
                    <Link to="/">
                        <img className="relative z-50 aspect-ratio:1/1 max-h-[220px]" src={logo} alt="Logo Asociacion Automoviles Antiguos de Lanus" />
                    </Link>
                </article>
                
                <section className='flex flex-col items-center justify-center text-center w-2/3 md:w-3/4 md:pr-2'>
                    <h2 className={`${textoTitulo} font-medium mrAlex text-shadow-lg text-shadow-black`}>
                        <span className={primeraLetraTitulo}>A</span>SOCIACION DE <span className={primeraLetraTitulo}>A</span>UTOMOVILES <span className={primeraLetraTitulo}>A</span>NTIGUOS DE <span className={primeraLetraTitulo}>L</span>ANUS
                    </h2>
                    <h5 className='text-center italic text-xs sm:text-sm md:text-md lg:text-lg mt-1 texto-crema'>Fundada el 24 de septiembre del 2000</h5>
                </section>
            </div>
        </header>
    );
};

export default Header;