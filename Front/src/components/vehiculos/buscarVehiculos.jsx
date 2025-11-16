import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import InputError from "@/components/otros/inputError";
import BotonPrimario from '@/components/botones/primario';
import { getSuggestions } from '@/services/vehiculoServices';

const BuscarVehiculos = ({ onBuscar, clase }) => {
    const anios = Array.from({ length: 2025 - 1880 + 1 }, (_, i) => 1880 + i).reverse();
    
    const validationSchema = Yup.object({
        marca: Yup.string()
            .max(50, "La marca no puede tener más de 50 caracteres"),
        modelo: Yup.string()
            .max(50, "El modelo no puede tener más de 50 caracteres"),
    });

    const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);
    const debounceTimer = useRef(null);

    const fetchSuggestions = async (query) => {
        if (!query || query.trim().length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        setLoading(true);
        try {
            const res = await getSuggestions(query);

            setSuggestions(res.data?.rows || []);
            setShowSuggestions(true);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(e.target) &&
                inputRef.current && !inputRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectSuggestion = (suggestion) => {
        setValue('marca', suggestion, { shouldValidate: true });
        setShowSuggestions(false);
        setSelectedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                if (selectedIndex >= 0) {
                    e.preventDefault();
                    handleSelectSuggestion(suggestions[selectedIndex]);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
        }
    };

    const onSubmit = (data) => {
        onBuscar(data.marca, data.modelo, data.desde, data.hasta);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`border-2 border-gray-500 rounded-xl my-5 overflow-hidden w-full md:w-auto ${clase && clase}`}>
            <div className='flex flex-col md:flex-row gap-2 mb-2 bg-gray-200 p-2'>
                <article className="flex flex-col mb-2 w-full relative">
                    <label
                        className="font-medium"
                        htmlFor="marca">Marca:</label>
                    <input
                        {...register("marca", {
                            onChange: (e) => {
                                const value = e.target.value;

                                if (debounceTimer.current) {
                                    clearTimeout(debounceTimer.current);
                                }

                                debounceTimer.current = setTimeout(() => {
                                    fetchSuggestions(value);
                                }, 300);
                            }
                        })}
                        ref={inputRef}
                        onFocus={() => setShowSuggestions(true)}
                        onKeyDown={handleKeyDown}
                        className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 ${errors.marca ? 'border-red-600' : 'border-[#858f7b]'}`}
                        type="text"
                        autoComplete="off"/>
                    {errors.marca && <InputError mensaje={errors.marca.message} />}
                    {showSuggestions && suggestions.length > 0 && (
                        <ul
                            ref={suggestionsRef}
                            className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg z-10">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelectSuggestion(suggestion)}
                                    className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${index === selectedIndex ? 'bg-blue-100' : ''
                                        }`}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}

                    {loading && (
                        <span className="absolute right-2 top-8 text-gray-400 text-sm">
                            Buscando...
                        </span>
                    )}
                </article>
                <article className="flex flex-col mb-2 w-full">
                    <label
                        className="font-medium"
                        htmlFor="modelo">Modelo:</label>
                    <input
                        {...register("modelo")}
                        className={`bg-[#bac7ad] focus:bg-amber-50  border-[1px] rounded-md px-2 py-1 ${errors.modelo ? 'border-red-600' : 'border-[#858f7b]'}`}
                        type="text" />
                    {errors.modelo && <InputError mensaje={errors.modelo.message} />}
                </article>
            </div>
            <p className='px-2 text-center'>Buscar por año</p>
            <div className='flex gap-2 p-2'>
                <article className="flex flex-col mb-2 w-full">
                    <label
                        className="font-medium"
                        htmlFor="desde">Desde:</label>
                    <select
                        {...register("desde")}
                        className="bg-[#bac7ad] focus:bg-amber-50 border-[1px] rounded-md px-2 py-1 border-[#858f7b]"
                    >
                        <option value="">Desde:</option>
                        {anios.map(anio => (
                            <option key={anio} value={anio}>{anio}</option>
                        ))}
                    </select>
                </article>
                <article className="flex flex-col mb-2 w-full">
                    <label
                        className="font-medium"
                        htmlFor="hasta">Hasta:</label>
                    <select
                        {...register("hasta")}
                        className="bg-[#bac7ad] focus:bg-amber-50 border-[1px] rounded-md px-2 py-1 border-[#858f7b]"
                    >
                        <option value="">Hasta:</option>
                        {anios.map(anio => (
                            <option key={anio} value={anio}>{anio}</option>
                        ))}
                    </select>
                </article>
            </div>
            <BotonPrimario
                tipo='submit'
                texto='Buscar'
                clase='rounded-md w-full py-1' />

        </form>
    );
};

export default BuscarVehiculos;