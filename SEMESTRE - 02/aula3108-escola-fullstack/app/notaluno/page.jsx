'use client'

import { useState } from "react";
import Header from "../components/header";
import styles from "./page.module.css";

export default function CadNota() {
    const [aluno, setAluno] = useState("");
    const [t1, setT1] = useState("");
    const [t2, setT2] = useState("");
    const [n1, setN1] = useState("");
    const [n2, setN2] = useState("");
    const [n3, setN3] = useState("");

    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.wrapper}>

                    {/* Cabeçalho */}
                    <div className={styles.pageHeader}>
                        <div>
                            <span className={styles.tag}>NOTAS</span>

                            <h2>Cadastro de Notas</h2>

                            <p>
                                Registre as notas do aluno preenchendo os campos abaixo.
                            </p>
                        </div>

                        <div className={styles.pageIcon}>
                            📝
                        </div>
                    </div>

                    <div className={styles.content}>

                        {/* Formulário */}
                        <section className={styles.card}>

                            <div className={styles.cardHeader}>
                                <div>
                                    <h3>Informações das notas</h3>

                                    <p>
                                        Selecione o aluno e informe suas respectivas notas.
                                    </p>
                                </div>
                            </div>

                            <form className={styles.form}>

                                {/* ALUNO */}
                                <div className={styles.fieldFull}>

                                    <label htmlFor="aluno">
                                        Aluno
                                    </label>

                                    <div className={styles.inputWrapper}>
                                        <span>👨‍🎓</span>

                                        <input
                                            id="aluno"
                                            type="text"
                                            placeholder="Digite o nome do aluno"
                                            value={aluno}
                                            onChange={(e) =>
                                                setAluno(e.target.value)
                                            }
                                        />
                                    </div>

                                </div>

                                {/* TRABALHOS */}
                                <div className={styles.sectionTitle}>
                                    <span>📚</span>

                                    <div>
                                        <h4>Trabalhos</h4>

                                        <p>
                                            Informe as notas dos trabalhos realizados.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.row}>

                                    <div className={styles.field}>

                                        <label htmlFor="t1">
                                            T1 — Trabalho 1
                                        </label>

                                        <div className={styles.inputWrapper}>
                                            <span>1️⃣</span>

                                            <input
                                                id="t1"
                                                type="number"
                                                min="0"
                                                max="10"
                                                step="0.1"
                                                placeholder="0,0"
                                                value={t1}
                                                onChange={(e) =>
                                                    setT1(e.target.value)
                                                }
                                            />
                                        </div>

                                    </div>

                                    <div className={styles.field}>

                                        <label htmlFor="t2">
                                            T2 — Trabalho 2
                                        </label>

                                        <div className={styles.inputWrapper}>
                                            <span>2️⃣</span>

                                            <input
                                                id="t2"
                                                type="number"
                                                min="0"
                                                max="10"
                                                step="0.1"
                                                placeholder="0,0"
                                                value={t2}
                                                onChange={(e) =>
                                                    setT2(e.target.value)
                                                }
                                            />
                                        </div>

                                    </div>

                                </div>

                                {/* NOTAS */}
                                <div className={styles.sectionTitle}>
                                    <span>📊</span>

                                    <div>
                                        <h4>Avaliações</h4>

                                        <p>
                                            Informe as notas das avaliações do aluno.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.gradeGrid}>

                                    <div className={styles.field}>

                                        <label htmlFor="n1">
                                            N1 — Nota 1
                                        </label>

                                        <div className={styles.inputWrapper}>
                                            <span>📝</span>

                                            <input
                                                id="n1"
                                                type="number"
                                                min="0"
                                                max="10"
                                                step="0.1"
                                                placeholder="0,0"
                                                value={n1}
                                                onChange={(e) =>
                                                    setN1(e.target.value)
                                                }
                                            />
                                        </div>

                                    </div>

                                    <div className={styles.field}>

                                        <label htmlFor="n2">
                                            N2 — Nota 2
                                        </label>

                                        <div className={styles.inputWrapper}>
                                            <span>📝</span>

                                            <input
                                                id="n2"
                                                type="number"
                                                min="0"
                                                max="10"
                                                step="0.1"
                                                placeholder="0,0"
                                                value={n2}
                                                onChange={(e) =>
                                                    setN2(e.target.value)
                                                }
                                            />
                                        </div>

                                    </div>

                                    <div className={styles.field}>

                                        <label htmlFor="n3">
                                            N3 — Nota 3
                                        </label>

                                        <div className={styles.inputWrapper}>
                                            <span>📝</span>

                                            <input
                                                id="n3"
                                                type="number"
                                                min="0"
                                                max="10"
                                                step="0.1"
                                                placeholder="0,0"
                                                value={n3}
                                                onChange={(e) =>
                                                    setN3(e.target.value)
                                                }
                                            />
                                        </div>

                                    </div>

                                </div>

                                {/* BOTÕES */}
                                <div className={styles.actions}>

                                    <button
                                        type="button"
                                        className={styles.cancel}
                                        onClick={() => {
                                            setAluno("");
                                            setT1("");
                                            setT2("");
                                            setN1("");
                                            setN2("");
                                            setN3("");
                                        }}
                                    >
                                        Limpar
                                    </button>

                                    <button
                                        type="submit"
                                        className={styles.button}
                                    >
                                        <span>✓</span>
                                        Cadastrar notas
                                    </button>

                                </div>

                            </form>
                        </section>

                        {/* PAINEL LATERAL */}
                        <aside className={styles.infoCard}>

                            <div className={styles.infoIcon}>
                                📊
                            </div>

                            <h3>Controle de notas</h3>

                            <p>
                                Confira os valores antes de salvar o cadastro
                                das notas do aluno.
                            </p>

                            <div className={styles.infoItem}>
                                <span>✓</span>

                                <div>
                                    <strong>Aluno</strong>

                                    <small>
                                        Informe corretamente o aluno.
                                    </small>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <span>✓</span>

                                <div>
                                    <strong>T1 e T2</strong>

                                    <small>
                                        Notas referentes aos dois trabalhos.
                                    </small>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <span>✓</span>

                                <div>
                                    <strong>N1, N2 e N3</strong>

                                    <small>
                                        Informe as três notas das avaliações.
                                    </small>
                                </div>
                            </div>

                            <div className={styles.noteBox}>
                                <span>ℹ️</span>

                                <p>
                                    As notas devem ser informadas de acordo
                                    com o sistema de avaliação da escola.
                                </p>
                            </div>

                        </aside>

                    </div>
                </div>
            </main>
        </>
    );
}