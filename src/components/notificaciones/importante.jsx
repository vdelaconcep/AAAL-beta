import BotonPrimario from "../botones/primario";

const Importante = ({ mensaje, setAbrirModal }) => {
    return (
        <article className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center'>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <h2 className="text-xl font-bold mb-4 text-center">IMPORTANTE</h2>
                <p>{mensaje}</p>

                <div className='flex justify-center mt-5'>
                    <BotonPrimario
                        tipo='button'
                        texto='OK'
                        accion={() => setAbrirModal(false)} />
                </div>
            </div>

        </article>
    );
};

export default Importante;