import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.logo}>
                <h1>Terceiro A</h1>
            </Link>

            <nav>
                <ul className={styles.menu}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>

                    <li>
                        <Link href="/sobre">Sobre</Link>
                    </li>

                    <li>
                        <Link href="/fotos">Fotos</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}