'use client'

import { useState } from "react";
import Header from "../components/header";
import styles from "./page.module.css";

export default function CadAluno() {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [serie, setSerie] = useState("");
    const [ra, setRa] = useState("");

    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.wrapper}>

                    {/* Cabeçalho da página */}
                    <div className={styles.pageHeader}>
                        <div>
                            <span className={styles.tag}>ALUNOS</span>
                            <h2>Cadastro de Aluno</h2>
                            <p>
                                Cadastre um novo aluno preenchendo todas as informações abaixo.
                            </p>
                        </div>

                        <div className={styles.pageIcon}>
                            🎓
                        </div>
                    </div>

                    <div className={styles.content}>

                        {/* Formulário */}
                        <section className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <h3>Informações do aluno</h3>
                                    <p>Preencha os dados corretamente.</p>
                                </div>
                            </div>

                            <form className={styles.form}>

                                <div className={styles.fieldFull}>
                                    <label htmlFor="nome">
                                        Nome completo
                                    </label>

                                    <div className={styles.inputWrapper}>
                                        <span>👤</span>

                                        <input
                                            id="nome"
                                            type="text"
                                            placeholder="Digite o nome completo"
                                            value={nome}
                                            onChange={(e) =>
                                                setNome(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className={styles.row}>

                                    <div className={styles.field}>
                                        <label htmlFor="idade">
                                            Idade
                                        </label>

                                        <div className={styles.inputWrapper}>
                                            <span>🎂</span>

                                            <input
                                                id="idade"
                                                type="number"
                                                placeholder="Ex: 15"
                                                value={idade}
                                                onChange={(e) =>
                                                    setIdade(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.field}>
                                        <label htmlFor="serie">
                                            Série
                                        </label>

                                        <div className={styles.inputWrapper}>
                                            <span>📚</span>

                                            <input
                                                id="serie"
                                                type="text"
                                                placeholder="Ex: 9º Ano"
                                                value={serie}
                                                onChange={(e) =>
                                                    setSerie(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className={styles.fieldFull}>
                                    <label htmlFor="ra">
                                        Registro do Aluno (RA)
                                    </label>

                                    <div className={styles.inputWrapper}>
                                        <span>🪪</span>

                                        <input
                                            id="ra"
                                            type="text"
                                            placeholder="Digite o RA do aluno"
                                            value={ra}
                                            onChange={(e) =>
                                                setRa(e.target.value)
                                            }
                                        />
                                    </div>

                                    <small>
                                        O RA deve ser informado conforme o cadastro escolar.
                                    </small>
                                </div>

                                <div className={styles.actions}>
                                    <button
                                        type="button"
                                        className={styles.cancel}
                                        onClick={() => {
                                            setNome("");
                                            setIdade("");
                                            setSerie("");
                                            setRa("");
                                        }}
                                    >
                                        Limpar
                                    </button>

                                    <button
                                        type="submit"
                                        className={styles.button}
                                    >
                                        <span>✓</span>
                                        Cadastrar aluno
                                    </button>
                                </div>

                            </form>
                        </section>

                        {/* Painel lateral */}
                        <aside className={styles.infoCard}>
                            <div className={styles.infoIcon}>
                                💡
                            </div>

                            <h3>Informações</h3>

                            <p>
                                Antes de cadastrar o aluno, confira se todos
                                os dados foram preenchidos corretamente.
                            </p>

                            <div className={styles.infoItem}>
                                <span>✓</span>
                                <div>
                                    <strong>Nome completo</strong>
                                    <small>Informe o nome completo do aluno.</small>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <span>✓</span>
                                <div>
                                    <strong>Idade</strong>
                                    <small>Informe a idade atual.</small>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <span>✓</span>
                                <div>
                                    <strong>Série</strong>
                                    <small>Informe a série atual.</small>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <span>✓</span>
                                <div>
                                    <strong>RA</strong>
                                    <small>Utilize o registro escolar correto.</small>
                                </div>
                            </div>
                        </aside>

                    </div>
                </div>
            </main>
        </>
    );
}