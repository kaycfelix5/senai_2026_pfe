import styles from "./header.module.css";

export default function Header({ titulo }) {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Bem-vindo(a) ao {titulo}</h1>

            <nav>
                <ul className={styles.menu}>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Sobre</a></li>
                    <li><a href="#">Reservas</a></li>
                </ul>
            </nav>
        </header>
    );
}