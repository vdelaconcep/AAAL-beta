import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [textoToast, setTextoToast] = useState('');
    const [success, setSuccess] = useState(false);
    const [accionAdicional, setAccionAdicional] = useState(null);


    const mostrarToast = (texto, opciones = {}) => {
        setTextoToast(texto);
        setSuccess(opciones.success || false);
        setAccionAdicional(() => opciones.accionAdicional || null);
        setVisible(true);
    };

    const ocultarToast = () => {
        setVisible(false);
        if (accionAdicional) accionAdicional();
        setTimeout(() => {
            setTextoToast('');
            setSuccess(false);
            setAccionAdicional(null);
        }, 300);
    };

    return (
        <ToastContext.Provider value={{
            textoToast,
            visible,
            success,
            accionAdicional,
            mostrarToast,
            ocultarToast
        }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast debe usarse dentro de ToastProvider');
    }
    return context;
};