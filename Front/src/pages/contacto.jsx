import BotonPrimario from "../components/botones/primario";
import BotonSecundario from "../components/botones/secundario";

const Contacto = () => {
    return (
        <section className="flex flex-col items-center bg-amber-100 py-5 md:py-10 px-4 text-gray-900">

            <div className="flex flex-col items-center mb-4">
                <h1 className="text-xl md:text-2xl font-bold italic">Contacto</h1>
                <h6 className="text-sm md:text-md">Escribinos un mensaje y te responderemos a la brevedad</h6>
            </div>

            <form className="bg-[#A0AB94] px-2 py-3 rounded-xl shadow-md shadow-gray-800 text-md md:max-w-[300px]">
                <article className="flex flex-col mb-2">
                    <label
                        className="font-medium"
                        htmlFor="nombre">Nombre:</label>
                    <input
                        className="bg-[#bac7ad] focus:bg-amber-50  border-[1px] border-gray-400 rounded-md px-2 py-1"
                        type="text" />
                </article>
                <article className="flex flex-col mb-2">
                    <label
                        className="font-medium"
                        htmlFor="email">E-mail:</label>
                    <input
                        className="bg-[#bac7ad] focus:bg-amber-50  border-[1px] border-gray-400 rounded-md px-2 py-1"
                        type="email" />
                </article>
                <article className="flex flex-col mb-2">
                    <label
                        className="font-medium"
                        htmlFor="telefono">Teléfono (opcional):</label>
                    <input
                        className="bg-[#bac7ad] focus:bg-amber-50  border-[1px] border-gray-400 rounded-md px-2 py-1"
                        type="text" />
                </article>
                <article className="flex flex-col mb-2">
                    <label
                        className="font-medium"
                        htmlFor="asunto">Asunto:</label>
                    <input
                        className="bg-[#bac7ad] focus:bg-amber-50  border-[1px] border-gray-400 rounded-md px-2 py-1"
                        type="text" />
                </article>
                <article className="flex flex-col mb-4">
                    <label
                        className="font-medium"
                        htmlFor="mensaje">Mensaje:</label>
                    <textarea
                        className="bg-[#bac7ad] focus:bg-amber-50  border-[1px] border-gray-400 rounded-md px-2 py-1 h-[100px]" />
                </article>
                <article className="flex gap-2">
                    <BotonSecundario
                        texto='Cancelar'
                    clase='w-1/2'/>
                    <BotonPrimario
                        texto='Enviar'
                        clase='w-1/2 shadow-[inset_0_2px_6px_rgba(256,256,256,0.8)]'/>
                </article>
            </form>
            
            
            

        </section>
        
    )
};

export default Contacto;