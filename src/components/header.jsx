import logo from '../assets/img/logo-asociacion-automoviles-antiguos-lanus-e1536856848852-transformed.png';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className='flex text-white justify-center mb-4 mt-1'>
            <Link to="/">
                <img className="h-35 mr-2" src={logo} alt="Logo Asociacion Automoviles Antiguos de Lanus" />
            </Link>
            <section className='flex flex-col justify-center text-center ml-2'>
                <h5 className='text-center mb-2 text-sky-500 font-medium'>
                    BIENVENIDOS A
                </h5>
                <h2 className='text-3xl font-bold'>
                    ASOCIACIÓN DE AUTOMÓVILES ANTIGUOS DE LANÚS
                </h2>
                <h5 className='text-center italic text-xl mt-1'>25 años</h5>
            </section>
        </header>
    );
};

export default Header;