import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [textoAlert, setTextoAlert] = useState('');
    const [importante, setImportante] = useState(false);
    const [accionAdicional, setAccionAdicional] = useState(null);

    const mostrarAlert = (texto, opciones = {}) => {
        setTextoAlert(texto);
        setImportante(opciones.importante || false);
        setAccionAdicional(()=> opciones.accionAdicional || null);
        setVisible(true);
    };

    const ocultarAlert = () => {
        setVisible(false);
        if (accionAdicional) accionAdicional();
        setTimeout(() => {
            setTextoAlert('');
            setImportante(false);
            setAccionAdicional(null);
        }, 300);
    };


    return (
        <AlertContext.Provider value={{
            textoAlert,
            visible,
            importante,
            accionAdicional,
            mostrarAlert,
            ocultarAlert
        }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert debe usarse dentro de AlertProvider');
    }
    return context;
};