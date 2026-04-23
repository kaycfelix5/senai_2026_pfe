import { useState, useEffect } from "react";

export default function BuscaCep(){
    const [cep, setCep] = useState('');
    const [endereço,setEndereço] = useState(null)

useEffect(() =>{
    if(cep.length==8){fetch(`https://viacep.com.br/ws/${cep}/json/`).then(response => response.json()).then(data =>{
        if(!data.erro){setEndereço(data);} 
        else
        {setEndereço(null);
         alert('Cep não localizado');   
        }
    }).catch(error => console.error('Erro ao acessar ',error))
}
},[cep])

return(
    <>
        <h1>Busca Cep</h1>
        <input type="number" placeholder="Digite para pesquisar" maxLength="8"
        value={cep}
        onChange={(e) => setCep(e.target.value)} />

        {endereço && (
            <div>
                <p>Logradouro: {endereço.logradouro}</p>
                <p>Bairro: {endereço.bairro} </p>
                <p>Cidade: {endereço. localidade} </p>
            </div>
        )}
    </>
)
}