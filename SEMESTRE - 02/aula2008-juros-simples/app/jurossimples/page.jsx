"use client";

import { useState } from "react";
import styles from "./juros.module.css";

export default function JurosCalculadora() {
    const [tipoJuros, setTipoJuros] = useState("simples");

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

        let juros;
        let montante;

        if (tipoJuros === "simples") {
            // J = C × i × t
            juros = c * i * t;

            // M = C + J
            montante = c + juros;
        } else {
            // M = C × (1 + i)^t
            montante = c * Math.pow(1 + i, t);

            // J = M - C
            juros = montante - c;
        }

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

    const trocarTipo = (tipo) => {
        setTipoJuros(tipo);
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
                            {tipoJuros === "simples"
                                ? "JUROS SIMPLES"
                                : "JUROS COMPOSTOS"}
                        </span>
                    </div>

                    {resultado ? (
                        <>
                            <small>VALOR FINAL</small>

                            <strong className={styles.mainValue}>
                                R$ {resultado.montante}
                            </strong>
                        </>
                    ) : (
                        <strong className={styles.placeholder}>
                            R$ 0,00
                        </strong>
                    )}
                </div>

                {/* SELETOR */}
                <div className={styles.switch}>
                    <button
                        type="button"
                        className={
                            tipoJuros === "simples"
                                ? styles.active
                                : ""
                        }
                        onClick={() => trocarTipo("simples")}
                    >
                        Simples
                    </button>

                    <button
                        type="button"
                        className={
                            tipoJuros === "composto"
                                ? styles.active
                                : ""
                        }
                        onClick={() => trocarTipo("composto")}
                    >
                        Composto
                    </button>
                </div>

                {/* FORMULÁRIO */}
                <form onSubmit={calcular}>

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
                                R$ {resultado.capital}
                            </strong>
                        </div>

                        <div className={styles.resultCard}>
                            <span>JUROS</span>
                            <strong>
                                R$ {resultado.juros}
                            </strong>
                        </div>

                        <div className={styles.resultCard}>
                            <span>MONTANTE</span>
                            <strong>
                                R$ {resultado.montante}
                            </strong>
                        </div>

                    </div>
                )}

                {/* FÓRMULA */}
                <div className={styles.formula}>
                    <span>Fórmula utilizada</span>

                    <strong>
                        {tipoJuros === "simples"
                            ? "J = C × i × t"
                            : "M = C × (1 + i)ᵗ"}
                    </strong>
                </div>

            </div>
        </main>
    );
}