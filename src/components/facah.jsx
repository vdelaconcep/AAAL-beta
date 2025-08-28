import logo_facah from '../assets/img/logo-facah.png'
const Facah = () => {
    return (
        <section className="fondo-celeste borde-inferior-celeste-oscuro py-3 pt-4 flex items-center justify-center">
            <h1 className="pr-5 font-bold text-xl text-white italic text-shadow-gray-900 text-shadow-2xs">Asociación miembro de FACAH</h1>
            <a href="https://facah.com.ar/">
                <img src={logo_facah} alt="Logo FACAH" style={{width: "150px"}} title='Página de FACAH' className='cursor-pointer' />
            </a>
        </section>
    )
};

export default Facah;