import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>

            <div className={styles.container}>

                <Link href="/" className={styles.logo}>

                    <div className={styles.logoIcon}>
                        🎓
                    </div>

                    <div>
                        <h1>Projeto Escola</h1>
                        <span>SESI Mirandópolis</span>
                    </div>

                </Link>

                <nav aria-label="Navegação principal">

                    <ul className={styles.nav}>

                        <li>
                            <Link href="/" className={styles.link}>
                                Início
                            </Link>
                        </li>

                        <li>
                            <Link href="/cadaluno" className={styles.link}>
                                Cadastro de Alunos
                            </Link>
                        </li>

                        <li>
                            <Link href="/listalunos" className={styles.link}>
                                Lista de Alunos
                            </Link>
                        </li>

                        <li>
                            <Link href="/notaluno" className={styles.link}>
                                Cadastro de Notas
                            </Link>
                        </li>

                        <li>
                            <Link href="/listnota" className={styles.link}>
                                Lista de Notas
                            </Link>
                        </li>

                        <li>
                            <Link href="/caddisciplina" className={styles.link}>
                                Cadastro de Disciplinas
                            </Link>
                        </li>

                        <li>
                            <Link href="/listadisciplinas" className={styles.link}>
                                Lista de Disciplinas
                            </Link>
                        </li>

                        <li>
                            <Link href="/cadprofessor" className={styles.link}>
                                Cadastro de Professores
                            </Link>
                        </li>

                        <li>
                            <Link href="/listaprofessores" className={styles.link}>
                                Lista de Professores
                            </Link>
                        </li>

                    </ul>

                </nav>

            </div>

        </header>
    );
}