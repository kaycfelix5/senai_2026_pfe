import { createContext, useState } from "react";

export const ContextoTema = createContext(null);

export function TemaProvedor({children}){
    const [ tema , setTema ] = useState('light');

    function mudarTema(){ // Isso cria um IF TERNARI ⬇️
        setTema((prev) => (prev === 'light' ? 'dark':'light'))
    }

    const valor = { tema , mudarTema };

    return(
        <ContextoTema.Provider value={valor}>
            {children}
        </ContextoTema.Provider>
    )
}