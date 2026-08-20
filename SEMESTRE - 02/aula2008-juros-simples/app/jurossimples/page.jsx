"use client";

import { useState } from "react";
import styles from "./juros.module.css";

export default function JurosSimples() {
    const [capital, setCapital] = useState("");
    const [txJuros, setTxJuros] = useState("");
    const [tempo, setTempo] = useState("");
    const [result, setResult] = useState(null);

    const calcularJuros = (e) => {
        e.preventDefault();

        const cap = parseFloat(capital);
        const tax = parseFloat(txJuros) / 100;
        const temp = parseFloat(tempo);

        if (isNaN(cap) || isNaN(tax) || isNaN(temp)) {
            return;
        }

        const juros = cap * tax * temp;
        const montante = cap + juros;

        setResult({
            juros: juros.toFixed(2),
            montante: montante.toFixed(2),
        });
    };

    const limpar = () => {
        setCapital("");
        setTxJuros("");
        setTempo("");
        setResult(null);
    };

    return (
        <main className={styles.page}>
            <div className={styles.calculator}>
                <div className={styles.display}>
                    <span className={styles.title}>JUROS SIMPLES</span>

                    {result ? (
                        <>
                            <span className={styles.displayLabel}>TOTAL</span>
                            <strong className={styles.total}>
                                R$ {result.montante}
                            </strong>
                        </>
                    ) : (
                        <strong className={styles.placeholder}>
                            0,00
                        </strong>
                    )}
                </div>

                <form onSubmit={calcularJuros}>
                    <div className={styles.inputGroup}>
                        <label>Capital</label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Digite o capital"
                            value={capital}
                            onChange={(e) => setCapital(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Taxa de juros (%)</label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Digite a taxa"
                            value={txJuros}
                            onChange={(e) => setTxJuros(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Tempo</label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Digite o tempo"
                            value={tempo}
                            onChange={(e) => setTempo(e.target.value)}
                        />
                    </div>

                    <div className={styles.buttons}>
                        <button
                            type="submit"
                            className={styles.calculate}
                        >
                            =
                        </button>

                        <button
                            type="button"
                            className={styles.clear}
                            onClick={limpar}
                        >
                            C
                        </button>
                    </div>
                </form>

                {result && (
                    <div className={styles.result}>
                        <div>
                            <span>Juros</span>
                            <strong>R$ {result.juros}</strong>
                        </div>

                        <div>
                            <span>Montante</span>
                            <strong>R$ {result.montante}</strong>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}