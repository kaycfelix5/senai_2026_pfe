import { useState } from "react";

export default function Calculadora({titulo}){
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [resultado, setResultado] = useState(0);
    const [sub, setSubtracao] = useState(0);
    const [multi, setMultiplicacao] = useState(0);
    const [div, setDivisao] = useState(0);
    const [pot, setPotencia] = useState(0);

    function somar(e){
        e.preventDefault();
        if(num1<=0||num2<=0){return console.error("Erro ao Calcular");
        } else {
        setResultado(Number(num1) + Number(num2));
        setSubtracao(Number(num1) - Number(num2));
        setMultiplicacao(Number(num1) * Number(num2));
        setDivisao(Number(num1) / Number(num2));
        setPotencia(Number(num1) ** Number(num2));
        setRaiz(Number(num1) ** Number(num2));
        return resultado;
        return sub;
        return multi;
        return div;
        return pot;
        return raiz;
    }}
    
    return(
    <>
        <h1>{titulo}</h1>
        <div>
            <form action="">
                <label htmlFor="numero1">Número 1</label>
                <input type="number" placeholder="0" value={num1} onChange={(e) => setNum1(e.target.value)}/>
                <br />
                <label htmlFor="numero2" >Número 2</label>
                <input type="number" placeholder="0" value={num2} onChange={(e) => setNum2(e.target.value)}/>
                <br />
                <button onClick={somar}>Calcular</button><br />
                <span style={{color:'red'}}>Soma: {resultado}</span><br />
                <span style={{color:'green'}}>Subtração: {sub}</span><br />
                <span style={{color:'blue'}}>Multiplicação: {multi}</span><br />
                <span style={{color:'purple'}}>Divisão: {div}</span><br />
                <span style={{color:'brow'}}>Potencia: {pot}</span><br />
                <span style={{color:'Black'}}>Raiz: {pot}</span><br />
            </form>
        </div>
    </>
    )
}
