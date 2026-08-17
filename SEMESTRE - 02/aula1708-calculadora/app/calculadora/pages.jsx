'use client';
import { useState, useRef } from "react";
import Header from "../components/header";
import './calculadora.css';

export default function Calculadora() {
    const [n1, setN1] = useState('');
    const [n2, setN2] = useState('');
    const [resultado, setResultado] = useState(null);
    const [operador, setOperador] = useState(null);
    const [animKey, setAnimKey] = useState(0);

    function triggerAnim() {
        setAnimKey(k => k + 1);
    }

    function Somar() {
        setResultado(Number(n1) + Number(n2));
        setOperador('+');
        triggerAnim();
    }

    function Subtrair() {
        setResultado(Number(n1) - Number(n2));
        setOperador('−');
        triggerAnim();
    }

    function Multiplicar() {
        setResultado(Number(n1) * Number(n2));
        setOperador('×');
        triggerAnim();
    }

    function Dividir() {
        if (Number(n2) === 0) {
            setResultado('Divisão por zero');
            setOperador('÷');
        } else {
            const r = Number(n1) / Number(n2);
            setResultado(parseFloat(r.toFixed(8)));
            setOperador('÷');
        }
        triggerAnim();
    }

    function RaizQuadrada() {
        const base = Number(n1);
        const indice = n2 === '' ? 2 : Number(n2);

        if (indice === 0) {
            setResultado('Índice zero inválido');
            setOperador('√');
            triggerAnim();
            return;
        }

        // Raiz de índice par com base negativa não é real
        if (base < 0 && indice % 2 === 0) {
            setResultado('Raiz não real');
            setOperador('√');
            triggerAnim();
            return;
        }

        // Para índice ímpar com base negativa: -(|base|^(1/indice))
        const resultado = base < 0
            ? -Math.pow(Math.abs(base), 1 / indice)
            : Math.pow(base, 1 / indice);

        // Superscript para o índice do operador
        const superscripts = { 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
        const sup = superscripts[indice] ?? `${indice}`;
        setOperador(`${sup}√`);
        setResultado(parseFloat(resultado.toFixed(8)));
        triggerAnim();
    }

    function Potencia() {
        setResultado(parseFloat(Math.pow(Number(n1), Number(n2)).toFixed(8)));
        setOperador('^');
        triggerAnim();
    }

    function Limpar() {
        setN1('');
        setN2('');
        setResultado(null);
        setOperador(null);
    }

    // Ripple effect handler
    function handleRipple(e) {
        const btn = e.currentTarget;
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = btn.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left - 20}px`;
        ripple.style.top = `${e.clientY - rect.top - 20}px`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    }

    const isError = typeof resultado === 'string';

    return (
        <>
            <Header />
            <div className="page">
                <div className="calculadora">

                    {/* Display */}
                    <div className="display">
                        <div className="display__inputs">
                            <span className="display__input-label">N1</span>
                            <input
                                id="n1"
                                className="display__input"
                                type="number"
                                value={n1}
                                placeholder="0"
                                onChange={(e) => setN1(e.target.value)}
                            />
                        </div>
                        <div className="display__inputs">
                            <span className="display__input-label">N2</span>
                            <input
                                id="n2"
                                className="display__input"
                                type="number"
                                value={n2}
                                placeholder={"Índice (padrão: 2)"}
                                onChange={(e) => setN2(e.target.value)}
                            />
                        </div>
                        <div className="display__divider" />
                        <div className="display__result-row">
                            <span className="display__result-label">Resultado</span>
                            {operador && <span className="display__operator">{operador}</span>}
                        </div>
                        <span
                            key={animKey}
                            className={`display__result result-animate${isError ? ' error' : ''}`}
                        >
                            {resultado !== null ? String(resultado) : '—'}
                        </span>
                    </div>

                    {/* Buttons */}
                    <div className="buttons">
                        <button
                            id="btn-somar"
                            className="btn btn--somar"
                            onClick={(e) => { handleRipple(e); Somar(); }}
                        >
                            + Somar
                        </button>
                        <button
                            id="btn-subtrair"
                            className="btn btn--subtrair"
                            onClick={(e) => { handleRipple(e); Subtrair(); }}
                        >
                            − Subtrair
                        </button>
                        <button
                            id="btn-multiplicar"
                            className="btn btn--multiplicar"
                            onClick={(e) => { handleRipple(e); Multiplicar(); }}
                        >
                            × Multiplicar
                        </button>
                        <button
                            id="btn-dividir"
                            className="btn btn--dividir"
                            onClick={(e) => { handleRipple(e); Dividir(); }}
                        >
                            ÷ Dividir
                        </button>
                        <button
                            id="btn-raiz"
                            className="btn btn--raiz"
                            onClick={(e) => { handleRipple(e); RaizQuadrada(); }}
                        >
                            √ Raiz
                        </button>
                        <button
                            id="btn-potencia"
                            className="btn btn--potencia"
                            onClick={(e) => { handleRipple(e); Potencia(); }}
                        >
                            Potencia
                        </button>
                        <button
                            id="btn-limpar"
                            className="btn btn--limpar"
                            onClick={Limpar}
                        >
                            ✕ Limpar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}