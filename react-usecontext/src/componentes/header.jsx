import { useContext} from "react";
import { ContextoTema } from '../contexts/temaContexto';

export default function Header(){
    const {tema, mudarTema} = useContext(ContextoTema);

    return(
        <header className={`header-${tema}`}>
           <h1>Avião colide com caminhão dos bombeiros em aeroporto de NY</h1>
           <img src="https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/03/Captura-de-tela-2026-03-23-033310.png?w=1200&h=900&crop=0" alt="" />
           <p>Um avião da Air Canada Express colidiu com um caminhão de bombeiros durante o pouso no Aeroporto LaGuardia, em Nova York, na noite de domingo (22). De acordo com um comunicado da agência reguladora FAA (Administração Federal de Aviação dos Estados Unidos), foi emitida uma ordem de suspensão de todas as operações aéreas no aeroporto.</p>
            <button onClick={mudarTema}>
                Mudar tema para {tema === 'light' ? 'escuro':'claro'}
            </button> 
        </header>
        
    )
}

