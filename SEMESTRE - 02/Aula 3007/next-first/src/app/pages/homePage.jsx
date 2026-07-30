import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";
import Hotel from "../img/hotel.jpg";
import styles from "./homePage.module.css";

export default function HomePage(){
    return(
        <>
            <Header titulo="Hotel Inn Terraço" />
            <main className={styles.main}>
                <Image
                    src={Hotel}
                    width={800}
                    height={400}
                    alt="Hotel Inn Terraço"
                    className={styles.image}
                />

                <h2 className={styles.title}>
                    Bem-vindo ao melhor hotel da região!
                </h2>
            </main>

            <Footer />
        </>
    )
}