import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
            className="bg-[#6B9795] border-b-[2px] border-b-[#5b807e] md:text-[#d3fffd] md:text-xl relative"
        >
            <div className="flex justify-end md:hidden py-1 pr-4">
                <motion.button
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    className="relative w-8 h-8 flex flex-col justify-center items-center cursor-pointer"
                    initial={false}
                    animate={menuAbierto ? "open" : "closed"}
                >
                    <motion.span
                        className="absolute h-[2px] w-6 bg-white rounded"
                        variants={{
                            closed: { rotate: 0, y: -6 },
                            open: { rotate: 45, y: 0 },
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        className="absolute h-[2px] w-6 bg-white rounded"
                        variants={{
                            closed: { opacity: 1 },
                            open: { opacity: 0 },
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        className="absolute h-[2px] w-6 bg-white rounded"
                        variants={{
                            closed: { rotate: 0, y: 6 },
                            open: { rotate: -45, y: 0 },
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.button>
            </div>

            <ul
                className={`flex-col md:flex md:flex-row justify-end md:space-x-2 transition-all duration-300 ${menuAbierto ? "absolute top-full left-0 w-full bg-[#DECBA0] border-b-[3px] border-b-[#bdad89] md:border-none shadow-lg shadow-gray-800 z-20 md:static md:bg-transparent md:w-auto md:z-auto flex" : "md:flex hidden"}`}
            >
                {menu.map((item) => (
                    <li key={item.nombre} className="relative cursor-pointer font-medium w-full md:w-auto md:border-none">
                        <button
                            className="cursor-pointer md:text-shadow-xs md:text-shadow-black hover:text-white rounded p-2 px-4 w-full text-left md:text-center text-lg font-bold md:text-xl md:font-medium"
                            onClick={() => {
                                toggleDesplegado(item.nombre);
                                if (item.submenu.length === 0) setMenuAbierto(false)
                            }}
                        >
                            {item.nombre}
                        </button>

                        {item.submenu.length > 0 && (
                            <>
                                <ul
                                    className={`hidden md:block md:absolute md:bg-[#DECBA0] md:text-lg md:rounded md:border md:border-[#5b807e] md:shadow-xl md:shadow-black md:w-40 md:transform md:transition-all md:duration-300 md:origin-top md:z-20 ${desplegado === item.nombre ? "md:opacity-100 md:scale-y-100" : "md:opacity-0 md:scale-y-0 md:pointer-events-none"}`}
                                >
                                    {item.submenu.map((i) => (
                                        <li
                                            key={i}
                                            className="p-2 pl-3 text-gray-900 hover:bg-[#6E1538] hover:text-white rounded"
                                            onClick={() => setDesplegado(null)}>
                                            {i}
                                        </li>
                                    ))}
                                </ul>

                                <ul
                                    ref={(el) => (submenuRefs.current[item.nombre] = el)}
                                    className="flex flex-col md:hidden overflow-hidden transition-[height,opacity] duration-300 bg-[#bdad89]"
                                    style={{
                                        height:
                                            desplegado === item.nombre
                                                ? `${submenuRefs.current[item.nombre]?.scrollHeight || 0}px`
                                                : "0px",
                                        opacity: desplegado === item.nombre ? 1 : 0,
                                    }}
                                >
                                    {item.submenu.map((i) => (
                                        <li
                                            key={i}
                                            className="pl-6 py-2"
                                            onClick={() => {
                                                setMenuAbierto(false);
                                                setDesplegado(null);
                                            }}>
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

