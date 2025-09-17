
import { useState, useRef, useEffect } from 'react';
import BotonPrimario from '../botones/primario';
import BotonSecundario from '../botones/secundario';

const Login = () => {

    const [abrirModal, setAbrirModal] = useState(false);

    const modalRef = useRef();

    useEffect(() => {
        const cerrarModal = (evento) => {
            if (abrirModal && modalRef.current && !modalRef.current.contains(evento.target)) setAbrirModal(false)
        }
        
        document.addEventListener('mousedown', cerrarModal);
        return () => document.removeEventListener('mousedown', cerrarModal);
    }, [abrirModal, setAbrirModal])

    return (
        <section>
            <article className="flex pt-1 justify-end text-xs md:text-s lg:text-sm">
                <button
                    className="border-none text-red-200 hover:underline cursor-pointer"
                    onClick={() => setAbrirModal(true)}>
                    <i className="fa-solid fa-wrench"></i>
                    <span> Ingresar</span>
                </button>
            </article>
            {abrirModal &&
                <article className='fixed inset-0 bg-black/70 backdrop-blur-sm z-60 flex items-center justify-center'>
                    <div
                        className="bg-[#DECBA0] p-4 md:p-8 rounded-lg shadow-md shadow-gray-500 max-w-[300px] md:max-w-md mx-auto relative"
                        ref={modalRef}>
                        <h2 className="text-xl text-center text-gray-900 font-bold mb-4">Inicie sesión como administrador</h2>
                        <form className='flex flex-col align-middle'>
                            <label className='block'>Usuario:</label>
                            <input
                                className='block border-b-[1px] border-black'
                                type="text" />
                            <label className='block mt-3'>Contraseña:</label>
                            <input
                                className='block border-b-[1px] border-black'
                                type="text" />
                            <div className='flex justify-center mt-6 md:mt-8'>
                                <BotonSecundario
                                    tipo='reset'
                                    texto='Cancelar'
                                    clase='mr-2'
                                    accion={() => setAbrirModal(false)} />
                                <BotonPrimario
                                    tipo='submit'
                                    texto='Acceder'
                                    clase='ml-2 px-4'
                                    accion={() => setAbrirModal(false)}/>
                            </div>
                            
                        </form>
                    </div>

                </article>}
        </section>
        
    )
};

export default Login;