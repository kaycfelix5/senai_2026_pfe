'use client'

import Header from "../components/header";
import styles from "./page.module.css";

export default function ListAluno() {
    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.wrapper}>

                    <div className={styles.pageHeader}>
                        <div>
                            <span className={styles.tag}>ALUNOS</span>

                            <h2>Lista de Alunos</h2>

                            <p>
                                Visualize os alunos cadastrados no sistema escolar.
                            </p>
                        </div>

                        <div className={styles.pageIcon}>
                            👨‍🎓
                        </div>
                    </div>

                    <section className={styles.card}>

                        <div className={styles.cardHeader}>
                            <div>
                                <h3>Alunos cadastrados</h3>
                                <p>Confira abaixo os dados dos alunos.</p>
                            </div>

                            <span className={styles.total}>
                                1 aluno
                            </span>
                        </div>

                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Idade</th>
                                        <th>Série</th>
                                        <th>RA</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>
                                            <span className={styles.idBadge}>
                                                01
                                            </span>
                                        </td>

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

                                        <td>15 anos</td>

                                        <td>
                                            <span className={styles.serie}>
                                                9º Ano
                                            </span>
                                        </td>

                                        <td>
                                            <span className={styles.ra}>
                                                202301011
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