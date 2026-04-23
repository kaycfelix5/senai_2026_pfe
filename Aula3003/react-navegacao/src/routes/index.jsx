import { Routes, Route } from "react-router-dom";

//Import das páginas
import Principal from '../pages/principal';

export default function Rotas(){
    return(
        <Routes>
            <Route path="/" element={<Principal/>}/>
        </Routes>
    )
}