import Link from "next/link";
import Header from "../components/header";
import styles from "./pages.module.css";

export default function Principal() {
    return (
        <>
            <Header />

            <main className={styles.main}>

                {/* HERO */}
                <section className={styles.hero}>

                    <div className={styles.heroContent}>

                        <span className={styles.badge}>
                            SISTEMA ESCOLAR
                        </span>

                        <h2>
                            Bem-vindo ao
                            <strong> Projeto Escola</strong>
                        </h2>

                        <p>
                            Uma plataforma desenvolvida para facilitar a
                            administração de alunos, professores, disciplinas e notas
                            do SESI Mirandópolis.
                        </p>

                        <div className={styles.heroButtons}>

                            <Link
                                href="/cadaluno"
                                className={styles.primaryButton}
                            >
                                Cadastrar aluno →
                            </Link>

                            <Link
                                href="/listalunos"
                                className={styles.secondaryButton}
                            >
                                Ver alunos
                            </Link>

                        </div>
                    </div>

                    <div className={styles.heroImage}>
                        <img
                            src="/images/escola.png"
                            alt="Estudantes em ambiente escolar"
                        />
                    </div>

                </section>

                {/* ESTATÍSTICAS */}
                <section className={styles.stats}>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>👨‍🎓</div>

                        <div>
                            <strong>Alunos</strong>
                            <span>Gerenciamento de estudantes</span>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>📚</div>

                        <div>
                            <strong>Notas</strong>
                            <span>Controle do desempenho acadêmico</span>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>📊</div>

                        <div>
                            <strong>Organização</strong>
                            <span>Informações centralizadas</span>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>🔐</div>

                        <div>
                            <strong>Segurança</strong>
                            <span>Dados organizados e protegidos</span>
                        </div>
                    </div>

                </section>

                {/* SOBRE */}
                <section className={styles.about}>

                    <div className={styles.aboutImage}>
                        <img
                            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80"
                            alt="Sala de aula"
                        />
                    </div>

                    <div className={styles.aboutContent}>

                        <span className={styles.sectionTag}>
                            SOBRE O SISTEMA
                        </span>

                        <h2>
                            Tecnologia a serviço da educação
                        </h2>

                        <p>
                            O Projeto Escola foi desenvolvido para tornar
                            mais simples e eficiente o gerenciamento das
                            informações acadêmicas.
                        </p>

                        <p>
                            A plataforma permite cadastrar alunos, professores e disciplinas,
                            além de registrar notas e consultar as informações
                            acadêmicas de maneira organizada.
                        </p>

                        <div className={styles.checkList}>
                            <div>✓ Cadastro de alunos</div>
                            <div>✓ Consulta de estudantes</div>
                            <div>✓ Registro de notas</div>
                            <div>✓ Consulta do desempenho</div>
                            <div>✓ Cadastro de professores e disciplinas</div>
                            <div>✓ Organização dos dias e aulas semanais</div>
                        </div>

                    </div>
                </section>

                {/* FUNCIONALIDADES */}
                <section className={styles.features}>

                    <div className={styles.sectionHeader}>

                        <span className={styles.sectionTag}>
                            FUNCIONALIDADES
                        </span>

                        <h2>
                            Tudo em um só lugar
                        </h2>

                        <p>
                            Acesse rapidamente as principais ferramentas
                            do sistema escolar.
                        </p>

                    </div>

                    <div className={styles.featureGrid}>

                        <Link
                            href="/cadaluno"
                            className={styles.featureCard}
                        >
                            <div className={styles.featureIcon}>
                                👤
                            </div>

                            <h3>Cadastro de Alunos</h3>

                            <p>
                                Cadastre novos estudantes e mantenha
                                as informações acadêmicas organizadas.
                            </p>

                            <span>Acessar →</span>
                        </Link>

                        <Link
                            href="/listalunos"
                            className={styles.featureCard}
                        >
                            <div className={styles.featureIcon}>
                                👥
                            </div>

                            <h3>Lista de Alunos</h3>

                            <p>
                                Consulte os alunos cadastrados
                                no sistema escolar.
                            </p>

                            <span>Acessar →</span>
                        </Link>

                        <Link
                            href="/notaluno"
                            className={styles.featureCard}
                        >
                            <div className={styles.featureIcon}>
                                📝
                            </div>

                            <h3>Cadastro de Notas</h3>

                            <p>
                                Registre as notas e informações
                                relacionadas ao desempenho dos alunos.
                            </p>

                            <span>Acessar →</span>
                        </Link>

                        <Link
                            href="/listnota"
                            className={styles.featureCard}
                        >
                            <div className={styles.featureIcon}>
                                📈
                            </div>

                            <h3>Lista de Notas</h3>

                            <p>
                                Visualize as notas cadastradas
                                e acompanhe o desempenho acadêmico.
                            </p>

                            <span>Acessar →</span>
                        </Link>

                        <Link
                            href="/caddisciplina"
                            className={styles.featureCard}
                        >
                            <div className={styles.featureIcon}>📚</div>

                            <h3>Cadastro de Disciplinas</h3>

                            <p>
                                Cadastre disciplinas e defina a pontuação mínima para aprovação.
                            </p>

                            <span>Acessar →</span>
                        </Link>

                        <Link
                            href="/listadisciplinas"
                            className={styles.featureCard}
                        >
                            <div className={styles.featureIcon}>📖</div>

                            <h3>Lista de Disciplinas</h3>

                            <p>
                                Consulte, edite e organize as disciplinas cadastradas.
                            </p>

                            <span>Acessar →</span>
                        </Link>

                        <Link
                            href="/cadprofessor"
                            className={styles.featureCard}
                        >
                            <div className={styles.featureIcon}>👨‍🏫</div>

                            <h3>Cadastro de Professores</h3>

                            <p>
                                Cadastre professores, NIF, dias de aula e disciplina responsável.
                            </p>

                            <span>Acessar →</span>
                        </Link>

                        <Link
                            href="/listaprofessores"
                            className={styles.featureCard}
                        >
                            <div className={styles.featureIcon}>👥</div>

                            <h3>Lista de Professores</h3>

                            <p>
                                Consulte os professores e suas respectivas cargas horárias.
                            </p>

                            <span>Acessar →</span>
                        </Link>

                    </div>
                </section>

                {/* BANNER FINAL */}
                <section className={styles.finalBanner}>

                    <div>
                        <span>PROJETO ESCOLA</span>

                        <h2>
                            Educação, organização e tecnologia.
                        </h2>

                        <p>
                            Uma solução criada para facilitar a gestão
                            das informações escolares.
                        </p>
                    </div>

                    <Link
                        href="/listalunos"
                        className={styles.finalButton}
                    >
                        Acessar sistema →
                    </Link>

                </section>

            </main>

            {/* FOOTER */}
            <footer className={styles.footer}>

                <div className={styles.footerContent}>

                    <div>
                        <h3>🎓 Projeto Escola</h3>

                        <p>
                            Sistema de gerenciamento escolar
                            desenvolvido para o SESI Mirandópolis.
                        </p>
                    </div>

                    <div>
                        <h4>Links rápidos</h4>

                        <Link href="/">Início</Link>

                        <Link href="/cadaluno">
                            Cadastro de alunos
                        </Link>

                        <Link href="/listalunos">
                            Lista de alunos
                        </Link>

                        <Link href="/caddisciplina">
                            Cadastro de disciplinas
                        </Link>

                        <Link href="/listadisciplinas">
                            Lista de disciplinas
                        </Link>
                    </div>

                    <div>
                        <h4>Notas</h4>

                        <Link href="/notaluno">
                            Cadastro de notas
                        </Link>

                        <Link href="/listnota">
                            Lista de notas
                        </Link>

                        <Link href="/cadprofessor">
                            Cadastro de professores
                        </Link>

                        <Link href="/listaprofessores">
                            Lista de professores
                        </Link>
                    </div>

                </div>

                <div className={styles.copyright}>
                    © 2026 Projeto Escola — SESI Mirandópolis
                </div>

            </footer>
        </>
    );
}