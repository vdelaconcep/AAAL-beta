
import { useState } from 'react';
import BotonPrimario from './botones/primario';
import BotonSecundario from './botones/secundario';

const Login = () => {

    const [abrirModal, setAbrirModal] = useState(false);

    return (
        <section>
            <article className="flex mr-3 mt-1 justify-end">
                <button
                    className="border-none text-gray-500 hover:underline cursor-pointer"
                    onClick={() => setAbrirModal(true)}>
                    <i class="fa-solid fa-wrench"></i>
                    <span> Ingresar</span>
                </button>
            </article>
            {abrirModal &&
                <article className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center'>
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                        <h2 className="text-xl font-bold mb-4">Inicie sesión como administrador</h2>
                        <form className='flex flex-col align-middle'>
                            <label className='block'>Usuario:</label>
                            <input
                                className='block border-[1px] border-black rounded'
                                type="text" />
                            <label className='block'>Contraseña:</label>
                            <input
                                className='block border-[1px] border-black rounded'
                                type="text" />
                            <div className='flex justify-center mt-5'>
                                <BotonSecundario
                                    tipo='reset'
                                    texto='Cancelar'
                                    clase='mr-2'
                                    accion={() => setAbrirModal(false)} />
                                <BotonPrimario
                                    tipo='submit'
                                    texto='Acceder'
                                    clase='ml-2'
                                    accion={() => setAbrirModal(false)}/>
                            </div>
                            
                        </form>
                    </div>

                </article>}
        </section>
        
    )
};

export default Login;