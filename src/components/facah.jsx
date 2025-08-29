import logo_facah from '../assets/img/logo-facah.png'
const Facah = () => {
    return (
        <section className="fondo-celeste borde-inferior-celeste-oscuro py-5 flex items-center justify-center px-4">
            <h1 className="mr-1 md:mr-7 font-bold text-sm md:text-xl text-white italic text-shadow-gray-900 text-shadow-2xs w-80">La Asociación de Autos Antiguos de Lanús es una asociación miembro de FACAH</h1>
            <a href="https://facah.com.ar/">
                <img src={logo_facah} alt="Logo FACAH" style={{width: "150px"}} title='Página de FACAH' className='cursor-pointer' />
            </a>
        </section>
    )
};

export default Facah;