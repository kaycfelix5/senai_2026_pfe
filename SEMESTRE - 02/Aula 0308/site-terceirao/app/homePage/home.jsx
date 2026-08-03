import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import Turma from "../img/images.jpg";
import styles from "./homepage.module.css";

export default function HomePage() {
    return (
        <>
            <Header titulo="Formatura 2026" />

            <main className={styles.main}>
                <section className={styles.banner}>
                    <Image
                        src={Turma}
                        alt="Turma"
                        className={styles.image}
                    />
                </section>

                <section className={styles.info}>
                    <h3>Informações</h3>

                    <div className={styles.card}>
                        <h6>Formatura 18/11/2026</h6>

                        <p>
                            Todos estarão reunidos para viver esse momento
                            espetacular em nossas vidas.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}