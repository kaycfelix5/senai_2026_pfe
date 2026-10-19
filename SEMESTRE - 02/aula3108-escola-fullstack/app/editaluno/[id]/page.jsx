"use client";

import { useEffect, useState, use, Suspense } from "react";
import {
    useRouter,
    useParams,
    useSearchParams
} from "next/navigation";

import Header from "../components/header";
import styles from "./page.module.css";

function EditAlunoPage({ params: paramsPromise }) {
    const router = useRouter();
    const routeParams = useParams();
    const searchParams = useSearchParams();

    // Recupera o ID pela rota dinâmica ou pela query string
    const resolvedParams = paramsPromise
        ? use(paramsPromise)
        : null;

    const id =
        resolvedParams?.id ||
        routeParams?.id ||
        searchParams.get("id");

    // Estados dos dados do aluno
    const [id_aluno, setIdAluno] = useState("");
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [serie, setSerie] = useState("");
    const [ra, setRa] = useState("");

    const [carregando, setCarregando] = useState(true);

    // BUSCAR ALUNO PARA EDIÇÃO
    useEffect(() => {
        if (id) {
            buscarAluno(id);
        } else {
            setCarregando(false);
        }
    }, [id]);

    async function buscarAluno(idAluno) {
        try {
            setCarregando(true);

            const resposta = await fetch(
                `/api/alunos?id=${encodeURIComponent(idAluno)}`,
                {
                    cache: "no-store"
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(
                    dados.erro ||
                    dados.mensagem ||
                    "Aluno não encontrado!"
                );

                router.push("/listalunos");
                return;
            }

            setIdAluno(dados.id_aluno ?? idAluno);
            setNome(dados.nome ?? "");
            setIdade(dados.idade ?? "");
            setSerie(dados.serie ?? "");
            setRa(dados.ra ?? "");
        } catch (erro) {
            console.error(
                "Erro ao carregar aluno:",
                erro
            );

            alert("Erro ao carregar dados do aluno.");
        } finally {
            setCarregando(false);
        }
    }

    // EDITAR ALUNO
    async function editarAluno(event) {
        event.preventDefault();

        if (!id || !id_aluno) {
            alert("ID do aluno não foi encontrado.");
            return;
        }

        setCarregando(true);

        try {
            const resposta = await fetch("/api/alunos", {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    id_aluno: Number(id_aluno),
                    nome: nome.trim(),
                    idade: Number(idade),
                    serie: serie.trim(),
                    ra
                })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(
                    dados.erro ||
                    dados.mensagem ||
                    "Erro ao editar aluno."
                );

                return;
            }

            alert(
                dados.mensagem ||
                "Aluno atualizado com sucesso!"
            );

            router.push("/listalunos");
        } catch (erro) {
            console.error(
                "Erro ao editar aluno:",
                erro
            );

            alert("Erro ao atualizar os dados do aluno.");
        } finally {
            setCarregando(false);
        }
    }

    // TELA DE CARREGAMENTO
    if (carregando) {
        return (
            <>
                <Header />

                <main className={styles.main}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <span className={styles.tag}>
                                ALUNOS
                            </span>

                            <h1>Editar Aluno</h1>

                            <p>
                                Carregando informações do aluno...
                            </p>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    // CASO O ID NÃO SEJA INFORMADO
    if (!id) {
        return (
            <>
                <Header />

                <main className={styles.main}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <span className={styles.tag}>
                                ALUNOS
                            </span>

                            <h1>Editar Aluno</h1>

                            <p>
                                Nenhum aluno foi selecionado para edição.
                            </p>

                            <button
                                type="button"
                                className={styles.secondaryButton}
                                onClick={() =>
                                    router.push("/listalunos")
                                }
                            >
                                Voltar para lista
                            </button>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    // FORMULÁRIO DE EDIÇÃO
    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.container}>

                    <div className={styles.header}>
                        <span className={styles.tag}>
                            ALUNOS
                        </span>

                        <h1>Editar Aluno</h1>

                        <p>
                            Atualize os dados do aluno cadastrado
                            no sistema escolar.
                        </p>
                    </div>

                    <section className={styles.card}>
                        <form onSubmit={editarAluno}>

                            <input
                                type="hidden"
                                name="id_aluno"
                                value={id_aluno}
                                readOnly
                            />

                            <div className={styles.formGroup}>
                                <label htmlFor="nome">
                                    Nome
                                </label>

                                <input
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    value={nome}
                                    onChange={(event) =>
                                        setNome(event.target.value)
                                    }
                                    placeholder="Digite o nome do aluno"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="idade">
                                    Idade
                                </label>

                                <input
                                    id="idade"
                                    name="idade"
                                    type="number"
                                    min="1"
                                    value={idade}
                                    onChange={(event) =>
                                        setIdade(event.target.value)
                                    }
                                    placeholder="Digite a idade"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="serie">
                                    Série
                                </label>

                                <input
                                    id="serie"
                                    name="serie"
                                    type="text"
                                    value={serie}
                                    onChange={(event) =>
                                        setSerie(event.target.value)
                                    }
                                    placeholder="Ex.: 9º Ano"
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="ra">
                                    RA
                                </label>

                                <input
                                    id="ra"
                                    name="ra"
                                    type="text"
                                    value={ra}
                                    onChange={(event) =>
                                        setRa(event.target.value)
                                    }
                                    placeholder="Digite o RA do aluno"
                                    required
                                />
                            </div>

                            <div className={styles.buttons}>
                                <button
                                    type="submit"
                                    className={styles.primaryButton}
                                    disabled={carregando}
                                >
                                    {carregando
                                        ? "Salvando..."
                                        : "Atualizar aluno"}
                                </button>

                                <button
                                    type="button"
                                    className={styles.secondaryButton}
                                    onClick={() =>
                                        router.push("/listalunos")
                                    }
                                    disabled={carregando}
                                >
                                    Voltar para lista
                                </button>
                            </div>

                        </form>
                    </section>
                </div>
            </main>
        </>
    );
}

export default function EditAluno(props) {
    return (
        <Suspense
            fallback={
                <main className={styles.main}>
                    <div className={styles.container}>
                        <p>Carregando...</p>
                    </div>
                </main>
            }
        >
            <EditAlunoPage {...props} />
        </Suspense>
    );
}