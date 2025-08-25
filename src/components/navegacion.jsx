import { Link } from "react-router-dom";
import { useState } from 'react';

const Navegacion = () => {

    const menu = [
        { nombre: "La asociación", submenu: ["Quiénes somos", "Historia", "Comisión directiva", "Mensajes de socios"] },
        { nombre: "Novedades", submenu: ["Institucional", "Próximos eventos", "Clasificados"] },
        { nombre: "Galería", submenu: ["Fotos", "Videos", "Nuestros vehículos", "Motores estacionarios"] },
        { nombre: "Contacto", submenu: [] }
    ]

    const [desplegado, setDesplegado] = useState(null);

    const toggleDesplegado = (menu) => {
        setDesplegado(desplegado === menu ? null : menu);
    };

    return (
        <nav className="fondo-celeste text-gray-200 text-xl">
            <ul className="flex justify-end">
                {menu.map(item =>
                    <li
                        key={item.nombre}
                        className="relative cursor-pointer font-medium">
                        <button
                            className="cursor-pointer text-shadow-xs text-shadow-black hover:text-white rounded p-2 px-3"
                            onClick={() => toggleDesplegado(item.nombre)}>
                            {item.nombre}
                        </button>
                        {item.submenu.length > 0 && 
                            <ul className={`absolute bg-sky-200 text-lg rounded border-[1px] border-sky-400 shadow-xl shadow-black w-40 transform transition-all duration-300 origin-top z-50 ${desplegado === item.nombre
                                ? "opacity-100 scale-y-100"
                                : "opacity-0 scale-y-0 pointer-events-none"
                                }`}>
                                {item.submenu.map(i =>
                                    <li
                                        key={i}
                                    className="p-2 pl-3 text-black hover:bg-white rounded">{i}</li>
                                )}
                            </ul>
                        }
                    </li>
                )}
            </ul>
        </nav>
    )
};

export default Navegacion;