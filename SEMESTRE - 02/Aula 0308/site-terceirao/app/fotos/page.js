import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./fotos.module.css";

export default function Fotos() {
    return (
        <>
            <Header />

            <main className={styles.main}>
                <section className={styles.container}>
                    <h1>Galeria de Fotos</h1>

                    <p>
                        Reviva os melhores momentos da turma do 3º A do SESI
                        Mirandópolis. Em breve, todas as fotos da nossa trajetória
                        estarão disponíveis aqui.
                    </p>

                    <div className={styles.galeria}>
                        <div className={styles.foto}>Foto 1</div>
                        <div className={styles.foto}>Foto 2</div>
                        <div className={styles.foto}>Foto 3</div>
                        <div className={styles.foto}>Foto 4</div>
                        <div className={styles.foto}>Foto 5</div>
                        <div className={styles.foto}>Foto 6</div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}