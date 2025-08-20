const Historia = () => {
    return (
        <section className="relative bg-white w-full text-black">
            <div className="absolute top-0 bottom-0 left-1/2 w-[600px] bg-gray-300 -translate-x-1/2 z-0"></div>

            <div className="relative z-10 pb-4 mb-5">
                <h1 className="pl-6 mb-5 pt-4 font-bold text-xl">Historia de la Asociación</h1>

                <article className="columns-2 gap-8 px-6">
                    <div>
                        <p className='pb-4'>
                            Teodoro Hunko y Jorge Enrique Schneebeli fundaron el{" "}
                            <b>Club Asociación de Automóviles Antiguos de Lanús</b> el{" "}
                            <b>24 de septiembre del 2000</b>.
                        </p>

                        <p className='pb-4'>
                            En el pasado nuestro Club tenia el nombre de Automoto Club y luego tomó
                            el nombre actual, que hoy en día es{" "}
                            <b>Automóviles Antiguos de Lanús</b>.
                        </p>

                        <p className='pb-4'>
                            Nuestra sede se encuentra en la <b>Avenida Viamonte 2615</b>, Lanús Oeste
                            (Parque Gral. San Martin)
                        </p>
                    </div>

                    <div>
                        <p className='pb-4'>
                            Estamos al servicio de los socios y de la comunidad y somos convocados a
                            eventos ya sea en entidades educativas o salas de primeros auxilios,
                            entre otras.
                        </p>

                        <p className='pb-4'>
                            Queremos invitarlos a que recorran nuestro sitio web y puedan disfrutar
                            de nuestro contenido con las fotos de autos antiguos, información sobre
                            el club, eventos e historias.
                        </p>

                        <p className='pb-4'>¡Muchas gracias por visitarnos!</p>
                    </div>
                </article>
            </div>
            
        </section>
    )
};

export default Historia;