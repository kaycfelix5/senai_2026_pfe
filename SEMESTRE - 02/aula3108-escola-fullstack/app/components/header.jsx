import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>🎓</div>
                    <div>
                        <h1>Projeto Escola</h1>
                        <span>SESI Mirandópolis</span>
                    </div>
                </Link>

                <nav>
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
                    </ul>
                </nav>
            </div>
        </header>
    );
}