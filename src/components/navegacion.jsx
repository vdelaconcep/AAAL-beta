import { useState, useRef, useEffect } from "react";

const Navegacion = () => {
    const menu = [
        { nombre: "La asociación", submenu: ["Quiénes somos", "Historia", "Comisión directiva", "Mensajes de socios"] },
        { nombre: "Novedades", submenu: ["Institucional", "Próximos eventos", "Clasificados"] },
        { nombre: "Galería", submenu: ["Fotos", "Videos", "Nuestros vehículos", "Motores estacionarios"] },
        { nombre: "Contacto", submenu: [] }
    ];

    const [desplegado, setDesplegado] = useState(null);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const navRef = useRef(null);
    const submenuRefs = useRef({});

    const toggleDesplegado = (menu) => {
        setDesplegado(desplegado === menu ? null : menu);
    };

    useEffect(() => {
        const cerrar = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setDesplegado(null);
                setMenuAbierto(false);
            }
        };
        document.addEventListener("click", cerrar);
        return () => document.removeEventListener("click", cerrar);
    }, []);

    return (
        <nav
            ref={navRef}
            className="fondo-celeste borde-inferior-celeste-oscuro text-gray-200 text-xl relative"
        >
            <div className="flex justify-end md:hidden py-1 pr-2">
                <button
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    className="text-white focus:outline-none text-xl z-30"
                >
                    {menuAbierto ? "✕" : "☰"}
                </button>
            </div>

            <ul
                className={`flex-col md:flex md:flex-row justify-end md:space-x-2 transition-all duration-300 ${menuAbierto ? "absolute top-full left-0 w-full bg-sky-200 z-20 md:static md:bg-transparent md:w-auto md:z-auto flex" : "md:flex hidden"}`}
            >
                {menu.map((item) => (
                    <li key={item.nombre} className="relative cursor-pointer font-medium w-full md:w-auto border-b md:border-none border-sky-300">
                        <button
                            className="cursor-pointer text-shadow-xs text-shadow-black hover:text-white rounded p-2 px-3 w-full text-left md:text-center"
                            onClick={() => toggleDesplegado(item.nombre)}
                        >
                            {item.nombre}
                        </button>

                        {item.submenu.length > 0 && (
                            <>
                                <ul
                                    className={`hidden md:block md:absolute md:bg-sky-200 md:text-lg md:rounded md:border md:border-sky-400 md:shadow-xl md:shadow-black md:w-40 md:transform md:transition-all md:duration-300 md:origin-top md:z-20 ${desplegado === item.nombre ? "md:opacity-100 md:scale-y-100" : "md:opacity-0 md:scale-y-0 md:pointer-events-none"}`}
                                >
                                    {item.submenu.map((i) => (
                                        <li key={i} className="p-2 pl-3 text-black hover:bg-white rounded">
                                            {i}
                                        </li>
                                    ))}
                                </ul>

                                <ul
                                    ref={(el) => (submenuRefs.current[item.nombre] = el)}
                                    className="flex flex-col md:hidden overflow-hidden transition-[height,opacity] duration-300"
                                    style={{
                                        height:
                                            desplegado === item.nombre
                                                ? `${submenuRefs.current[item.nombre]?.scrollHeight || 0}px`
                                                : "0px",
                                        opacity: desplegado === item.nombre ? 1 : 0,
                                    }}
                                >
                                    {item.submenu.map((i) => (
                                        <li key={i} className="pl-6 py-2">
                                            {i}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navegacion;

