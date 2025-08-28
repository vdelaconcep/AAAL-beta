const Historia = () => {
    return (
        <section className= "fondo-celeste borde-inferior-celeste-oscuro w-full text-black pt-5">
            <h1 className="pl-6 mb-5 pt-4 font-bold text-xl italic text-white text-shadow-gray-900 text-shadow-2xs">Nuestra historia</h1>

            <article className="columns-2 gap-8 px-6 text-gray-200">
                <div>
                    <p className='pb-4'>
                        Teodoro Hunko y Jorge Enrique Schneebeli fundaron el <b className="texto-crema">Club Asociación de Automóviles Antiguos de Lanús</b> el <b className="texto-crema">24 de septiembre del 2000</b>.
                    </p>

                    <p className='pb-4'>
                        En el pasado nuestro Club tenia el nombre de Automoto Club y luego tomó
                        el nombre actual, que hoy en día es <b className="texto-crema">Automóviles Antiguos de Lanús</b>.
                    </p>

                    <p className='pb-4'>
                        Nuestra sede se encuentra en la <b className="texto-crema">Avenida Viamonte 2615</b>, Lanús Oeste
                        (Parque Gral. San Martin)
                    </p>
                </div>

                <div>
                    <p className='pb-4'>
                        Estamos <b className="texto-crema">al servicio de los socios y de la comunidad</b> y somos convocados a
                        eventos ya sea en entidades educativas o salas de primeros auxilios,
                        entre otras.
                    </p>

                    <p className='pb-4'>
                        Queremos invitarlos a que recorran nuestro sitio web y puedan disfrutar
                        de nuestro contenido con las fotos de autos antiguos, información sobre
                        el club, eventos e historias.
                    </p>

                    <p className='pb-4 text-end'>¡Muchas gracias por visitarnos!</p>
                </div>
            </article>
            
        </section>
    )
};

export default Historia;