"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Header from "../components/header";
import styles from "./page.module.css";

function CadAluno() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const id = searchParams.get("id");

    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [serie, setSerie] = useState("");
    const [ra, setRa] = useState("");

    const [carregando, setCarregando] = useState(false);


    // CARREGAR ALUNO PARA EDIÇÃO
    useEffect(() => {

        if (!id) {
            return;
        }

        async function carregarAluno() {

            try {

                const resposta = await fetch(
                    `/api/alunos?id=${id}`,
                    {
                        cache: "no-store"
                    }
                );

                const aluno = await resposta.json();

                if (!resposta.ok) {
                    alert(aluno.erro);
                    return;
                }

                setNome(aluno.nome);
                setIdade(aluno.idade);
                setSerie(aluno.serie);
                setRa(aluno.ra);

            } catch (error) {

                console.error(
                    "Erro ao carregar aluno:",
                    error
                );

                alert("Erro ao carregar aluno.");
            }
        }

        carregarAluno();

    }, [id]);


    // CADASTRAR OU EDITAR
    async function salvarAluno(event) {

        event.preventDefault();

        setCarregando(true);

        try {

            const dados = {
                nome,
                idade: Number(idade),
                serie,
                ra
            };

            let resposta;

            if (id) {

                resposta = await fetch("/api/alunos", {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        ...dados,
                        id_aluno: Number(id)
                    })
                });

            } else {

                resposta = await fetch("/api/alunos", {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(dados)
                });

            }

            const resultado = await resposta.json();

            if (!resposta.ok) {

                alert(
                    resultado.erro ||
                    "Erro ao salvar aluno."
                );

                return;
            }

            alert(resultado.mensagem);

            router.push("/listalunos");

        } catch (error) {

            console.error(
                "Erro ao salvar aluno:",
                error
            );

            alert("Erro ao salvar aluno.");

        } finally {

            setCarregando(false);

        }
    }


    return (
        <>
            <Header />

            <main className={styles.main}>

                <div className={styles.container}>

                    <div className={styles.header}>

                        <span className={styles.tag}>
                            ALUNOS
                        </span>

                        <h1>
                            {id
                                ? "Editar Aluno"
                                : "Cadastro de Alunos"}
                        </h1>

                        <p>
                            {id
                                ? "Atualize os dados do aluno."
                                : "Cadastre um novo aluno no sistema escolar."}
                        </p>

                    </div>


                    <section className={styles.card}>

                        <form onSubmit={salvarAluno}>

                            <div className={styles.formGroup}>

                                <label>
                                    Nome
                                </label>

                                <input
                                    type="text"
                                    value={nome}
                                    onChange={(e) =>
                                        setNome(e.target.value)
                                    }
                                    placeholder="Digite o nome do aluno"
                                    required
                                />

                            </div>


                            <div className={styles.formGroup}>

                                <label>
                                    Idade
                                </label>

                                <input
                                    type="number"
                                    value={idade}
                                    onChange={(e) =>
                                        setIdade(e.target.value)
                                    }
                                    placeholder="Digite a idade"
                                    required
                                />

                            </div>


                            <div className={styles.formGroup}>

                                <label>
                                    Série
                                </label>

                                <input
                                    type="text"
                                    value={serie}
                                    onChange={(e) =>
                                        setSerie(e.target.value)
                                    }
                                    placeholder="Ex.: 9º Ano"
                                    required
                                />

                            </div>


                            <div className={styles.formGroup}>

                                <label>
                                    RA
                                </label>

                                <input
                                    type="text"
                                    value={ra}
                                    onChange={(e) =>
                                        setRa(e.target.value)
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
                                        : id
                                            ? "Atualizar aluno"
                                            : "Cadastrar aluno"}
                                </button>


                                <button
                                    type="button"
                                    className={styles.secondaryButton}
                                    onClick={() =>
                                        router.push("/listalunos")
                                    }
                                >
                                    Ver lista de alunos
                                </button>

                            </div>

                        </form>

                    </section>

                </div>

            </main>
        </>
    );
}

export default function CadAlunoPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <CadAluno />
        </Suspense>
    );
}