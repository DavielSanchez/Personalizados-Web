import { auth } from './FireBaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

export const Auth = () => {
    const [user, setUser] = useState(null); // Estado del usuario

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user); // Usuario autenticado
            } else {
                setUser(null); // No autenticado
            }
        });

        return () => unsubscribe(); // Limpia el listener cuando el componente se desmonta
    }, []);

    return user; // Retorna el estado del usuario
};