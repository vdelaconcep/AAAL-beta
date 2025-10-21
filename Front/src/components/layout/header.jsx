import logo from '@/assets/img/logo-asociacion-automoviles-antiguos-lanus-e1536856848852-transformed.png';
import Login from '@/components/layout/login';
import { Link } from "react-router-dom";

const Header = () => {

    // Responsive
    const fontSizeTitulo = 'text-[1.3rem] min-[400px]:text-[1.5rem] min-[500px]:text-[2.2rem] sm:text-5xl lg:text-6xl'
    const anchoTitulo = 'max-w-[210px] min-[350px]:max-w-[220px] min-[400px]:max-w-[250px] min-[500px]:max-w-[350px] sm:max-w-[500px] lg:max-w-[750px]'
    const primeraLetraTitulo = 'text-[1.7rem] min-[400px]:text-[2rem] min-[500px]:text-[2.6rem] sm:text-[3.3rem] lg:text-[4.2rem]'
    const alturaLogo = 'max-h-[90px] min-[370px]:max-h-[120px] sm:max-h-[170px] lg:max-h-[220px]'

    return (
        <header className='bg-gradient-to-b from-[#350a1b] to-[#8a1a47] pb-3'>
            <Login clase='pt-1 pr-4 md:pr-10'/>
            <div className='flex min-[420px]:gap-1 text-white justify-center items-center w-full'>
                <article className=''>
                    <Link to="/">
                        <img className={`aspect-ratio:1/1 ${alturaLogo}`} src={logo} alt="Logo Asociacion Automoviles Antiguos de Lanus" />
                    </Link>
                </article>
                
                <article className='flex-col items-center justify-center text-center'>
                    <h2 className={`${fontSizeTitulo} font-medium mrAlex text-shadow-lg text-shadow-black leading-none ${anchoTitulo}`}>
                        <span className={primeraLetraTitulo}>A</span>SOCIACION DE <span className={primeraLetraTitulo}>A</span>UTOMOVILES <span className={primeraLetraTitulo}>A</span>NTIGUOS DE <span className={primeraLetraTitulo}>L</span>ANUS
                    </h2>
                    <h5 className='text-center italic text-[11.8px] sm:text-sm md:text-lg lg:text-xl mt-1 text-[#DECBA0] md:mt-2'>Fundada el 24 de septiembre del 2000</h5>
                </article>
            </div>
        </header>
    );
};

export default Header;