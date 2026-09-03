'use client'

import Header from "../components/header";
import styles from "./page.module.css";

export default function ListNota() {
    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.wrapper}>

                    {/* Cabeçalho */}
                    <div className={styles.pageHeader}>
                        <div>
                            <span className={styles.tag}>NOTAS</span>

                            <h2>Lista de Notas</h2>

                            <p>
                                Visualize as notas dos alunos cadastrados no sistema.
                            </p>
                        </div>

                        <div className={styles.pageIcon}>
                            📝
                        </div>
                    </div>

                    {/* Card */}
                    <section className={styles.card}>

                        <div className={styles.cardHeader}>
                            <div>
                                <h3>Notas cadastradas</h3>

                                <p>
                                    Confira abaixo as notas dos alunos.
                                </p>
                            </div>

                            <span className={styles.total}>
                                1 aluno
                            </span>
                        </div>

                        {/* Tabela */}
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Aluno</th>
                                        <th>T1</th>
                                        <th>T2</th>
                                        <th>N1</th>
                                        <th>N2</th>
                                        <th>N3</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    <tr>

                                        {/* ID */}
                                        <td>
                                            <span className={styles.idBadge}>
                                                01
                                            </span>
                                        </td>

                                        {/* ALUNO */}
                                        <td>
                                            <div className={styles.student}>
                                                <div className={styles.avatar}>
                                                    R
                                                </div>

                                                <div>
                                                    <strong>Rafael</strong>
                                                    <small>Aluno</small>
                                                </div>
                                            </div>
                                        </td>

                                        {/* T1 */}
                                        <td>
                                            <span className={styles.grade}>
                                                8,5
                                            </span>
                                        </td>

                                        {/* T2 */}
                                        <td>
                                            <span className={styles.grade}>
                                                9,0
                                            </span>
                                        </td>

                                        {/* N1 */}
                                        <td>
                                            <span className={styles.grade}>
                                                7,5
                                            </span>
                                        </td>

                                        {/* N2 */}
                                        <td>
                                            <span className={styles.grade}>
                                                8,0
                                            </span>
                                        </td>

                                        {/* N3 */}
                                        <td>
                                            <span className={styles.grade}>
                                                9,0
                                            </span>
                                        </td>

                                    </tr>

                                </tbody>

                            </table>
                        </div>

                    </section>
                </div>
            </main>
        </>
    );
}