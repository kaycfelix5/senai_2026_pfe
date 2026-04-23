import { useState } from "react";

export default function UseState({titulo}){
    const [nome, setNome] = useState('Kayc');
    const [idade, setIdade] = useState(17);
    const [ra, setRa] = useState(487512);
    const [bolsa, setBolsa] = useState(500);

    return(
        <>
        <h1>{titulo}</h1>
        <h3>Nome do aluno: {nome}</h3>
        <h3>Idade do aluno: {idade}</h3>
        <h3>Ra do aluno: {ra}</h3>
        <h3>Bolsa do aluno: R${bolsa}</h3>
        </>
    )
}