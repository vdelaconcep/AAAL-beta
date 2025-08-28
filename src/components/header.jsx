import logo from '../assets/img/logo-asociacion-automoviles-antiguos-lanus-e1536856848852-transformed.png';
import Login from './login';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className='fondo-granate'>
            <Login />
            <div className='flex text-white justify-center p-2 h-50'>
                <Link to="/">
                    <img className="relative h-52 mr-5 z-50 aspect-ratio:1/1" src={logo} alt="Logo Asociacion Automoviles Antiguos de Lanus" />
                </Link>
                <section className='flex flex-col justify-center text-center ml-5'>
                    <h2 className='text-5xl font-medium mrAlex text-shadow-lg text-shadow-black'>
                        <span className='primera-letra-titulo'>A</span>SOCIACION DE <span className='primera-letra-titulo'>A</span>UTOMOVILES <span className='primera-letra-titulo'>A</span>NTIGUOS DE <span className='primera-letra-titulo'>L</span>ANUS
                    </h2>
                    <h5 className='text-center italic text-xl mt-1 texto-crema'>Fundada el 24 de septiembre del 2000</h5>
                </section>
            </div>
        </header>
    );
};

export default Header;