"use client";

import { useState } from "react";
import styles from "./jurosCompostos.module.css";

export default function JurosCompostos() {
    const [capital, setCapital] = useState("");
    const [taxa, setTaxa] = useState("");
    const [tempo, setTempo] = useState("");

    const [resultado, setResultado] = useState(null);

    const calcular = (e) => {
        e.preventDefault();

        const c = parseFloat(capital);
        const i = parseFloat(taxa) / 100;
        const t = parseFloat(tempo);

        if (
            isNaN(c) ||
            isNaN(i) ||
            isNaN(t) ||
            c < 0 ||
            i < 0 ||
            t < 0
        ) {
            setResultado(null);
            return;
        }

        // Fórmula dos juros compostos:
        // M = C × (1 + i)^t
        const montante = c * Math.pow(1 + i, t);

        // Juros:
        // J = M - C
        const juros = montante - c;

        setResultado({
            capital: c.toFixed(2),
            juros: juros.toFixed(2),
            montante: montante.toFixed(2),
        });
    };

    const limpar = () => {
        setCapital("");
        setTaxa("");
        setTempo("");
        setResultado(null);
    };

    return (
        <main className={styles.page}>
            <div className={styles.calculator}>

                {/* VISOR */}
                <div className={styles.display}>
                    <div className={styles.displayTop}>
                        <span>CALCULADORA FINANCEIRA</span>

                        <span className={styles.mode}>
                            JUROS COMPOSTOS
                        </span>
                    </div>

                    {resultado ? (
                        <>
                            <small>VALOR FINAL</small>

                            <strong className={styles.mainValue}>
                                R$ {resultado.montante.replace(".", ",")}
                            </strong>
                        </>
                    ) : (
                        <strong className={styles.placeholder}>
                            R$ 0,00
                        </strong>
                    )}
                </div>

                {/* TÍTULO */}
                <div className={styles.title}>
                    <h1>Juros Compostos</h1>

                    <p>
                        Calcule os juros e o montante de uma aplicação
                        utilizando juros compostos.
                    </p>
                </div>

                {/* FORMULÁRIO */}
                <form onSubmit={calcular}>

                    {/* CAPITAL */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="capital">
                            Capital inicial
                        </label>

                        <div className={styles.inputWrapper}>
                            <span>R$</span>

                            <input
                                id="capital"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0,00"
                                value={capital}
                                onChange={(e) =>
                                    setCapital(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* TAXA */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="taxa">
                            Taxa de juros
                        </label>

                        <div className={styles.inputWrapper}>
                            <input
                                id="taxa"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0,00"
                                value={taxa}
                                onChange={(e) =>
                                    setTaxa(e.target.value)
                                }
                            />

                            <span>%</span>
                        </div>
                    </div>

                    {/* TEMPO */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="tempo">
                            Tempo
                        </label>

                        <div className={styles.inputWrapper}>
                            <input
                                id="tempo"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0"
                                value={tempo}
                                onChange={(e) =>
                                    setTempo(e.target.value)
                                }
                            />

                            <span>períodos</span>
                        </div>
                    </div>

                    {/* BOTÕES */}
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

                {/* RESULTADOS */}
                {resultado && (
                    <div className={styles.result}>

                        <div className={styles.resultCard}>
                            <span>CAPITAL</span>

                            <strong>
                                R$ {resultado.capital.replace(".", ",")}
                            </strong>
                        </div>

                        <div className={styles.resultCard}>
                            <span>JUROS</span>

                            <strong>
                                R$ {resultado.juros.replace(".", ",")}
                            </strong>
                        </div>

                        <div className={styles.resultCard}>
                            <span>MONTANTE</span>

                            <strong>
                                R$ {resultado.montante.replace(".", ",")}
                            </strong>
                        </div>

                    </div>
                )}

                {/* FÓRMULA */}
                <div className={styles.formula}>
                    <span>Fórmula utilizada</span>

                    <strong>
                        M = C × (1 + i)ᵗ
                    </strong>

                    <small>
                        M = montante · C = capital · i = taxa · t = tempo
                    </small>
                </div>

            </div>
        </main>
    );
}