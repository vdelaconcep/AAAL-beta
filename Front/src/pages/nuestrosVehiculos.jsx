import { useState } from 'react';

const NuestrosVehiculos = () => {
    const [show, setShow] = useState('');
    return (
        <main className="h-full bg-white py-7 md:py-10 flex flex-col items-center px-4">
            <h1 className="font-bold italic text-xl md:text-2xl mb-5 md:mb-9">Nuestros Vehículos</h1>
            <select name="porMarca" id="porMarca">
                <option value="Ford">Ford</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Justicialista">Justicialista</option>
            </select>
        </main>
    );
};

export default NuestrosVehiculos;