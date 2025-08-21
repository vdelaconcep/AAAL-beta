import logo from '../assets/img/logo-asociacion-automoviles-antiguos-lanus-e1536856848852-transformed.png';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className='bg-red-950 flex text-white justify-center p-3 pt-4 h-50'>
            <Link to="/">
                <img className="relative h-52 mr-5 z-50 aspect-ratio:1/1" src={logo} alt="Logo Asociacion Automoviles Antiguos de Lanus" />
            </Link>
            <section className='flex flex-col justify-center text-center ml-5'>
                <h2 className='text-3xl font-bold zeit text-shadow-lg text-shadow-black'>
                    ASOCIACIÓN DE AUTOMÓVILES ANTIGUOS DE LANÚS
                </h2>
                <h5 className='text-center italic text-xl mt-3 text-red-200'>Fundada el 24 de septiembre del 2000</h5>
            </section>
        </header>
    );
};

export default Header;