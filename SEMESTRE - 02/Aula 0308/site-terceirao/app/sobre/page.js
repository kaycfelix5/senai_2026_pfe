import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./sobre.module.css";

export default function Sobre() {
    return (
        <>
            <Header />

            <main className={styles.main}>
                <section className={styles.container}>
                    <h1>Sobre a Turma</h1>

                    <p>
                        A turma do 3º A do SESI Mirandópolis viveu momentos
                        inesquecíveis ao longo desses anos. Este site foi criado
                        para registrar nossa trajetória, amizades, conquistas e
                        celebrar a conclusão dessa importante etapa de nossas vidas.
                    </p>

                    <p>
                        Aqui você poderá conhecer um pouco mais sobre nossa
                        história e reviver, através das fotos, alguns dos melhores
                        momentos que compartilhamos juntos.
                    </p>
                </section>
            </main>

            <Footer />
        </>
    );
}