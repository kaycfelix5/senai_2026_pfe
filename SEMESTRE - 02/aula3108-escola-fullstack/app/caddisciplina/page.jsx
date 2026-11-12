"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../components/header";
import styles from "./page.module.css";

function FormDisciplina() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [nome, setNome] = useState("");
    const [pontuacaoMinima, setPontuacaoMinima] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [carregandoDados, setCarregandoDados] = useState(Boolean(id));

    // CARREGAR DISCIPLINA PARA EDIÇÃO
    useEffect(() => {
        if (!id) return;

        async function carregarDisciplina() {
            try {
                const resposta = await fetch(
                    `/api/disciplinas?id=${encodeURIComponent(id)}`,
                    { cache: "no-store" }
                );

                const dados = await resposta.json();

                if (!resposta.ok) {
                    alert(
                        dados.erro ||
                        "Não foi possível carregar a disciplina."
                    );

                    router.push("/listadisciplinas");
                    return;
                }

                setNome(dados.nome ?? "");

                setPontuacaoMinima(
                    String(dados.pontuacao_minima ?? "")
                );

            } catch (error) {
                console.error("Erro ao carregar disciplina:", error);

                alert("Erro ao carregar os dados da disciplina.");

            } finally {
                setCarregandoDados(false);
            }
        }

        carregarDisciplina();

    }, [id, router]);

    // SALVAR DISCIPLINA
    async function salvarDisciplina(event) {
        event.preventDefault();

        const pontuacao = Number(
            String(pontuacaoMinima).replace(",", ".")
        );

        if (!nome.trim()) {
            alert("Informe o nome da disciplina.");
            return;
        }

        if (
            !Number.isFinite(pontuacao) ||
            pontuacao < 0
        ) {
            alert(
                "Informe uma pontuação mínima válida, maior ou igual a zero."
            );

            return;
        }

        setCarregando(true);

        try {
            const dados = {
                nome: nome.trim(),
                pontuacao_minima: pontuacao
            };

            const resposta = await fetch("/api/disciplinas", {
                method: id ? "PUT" : "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(
                    id
                        ? {
                            ...dados,
                            id_disciplina: Number(id)
                        }
                        : dados
                )
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                alert(
                    resultado.erro ||
                    "Erro ao salvar a disciplina."
                );

                return;
            }

            alert(
                resultado.mensagem ||
                "Disciplina salva com sucesso!"
            );

            router.push("/listadisciplinas");

        } catch (error) {
            console.error("Erro ao salvar disciplina:", error);

            alert(
                "Não foi possível comunicar com o servidor."
            );

        } finally {
            setCarregando(false);
        }
    }

    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.container}>

                    <div className={styles.pageHeader}>
                        <div>
                            <span className={styles.tag}>
                                DISCIPLINAS
                            </span>

                            <h1>
                                {id
                                    ? "Editar Disciplina"
                                    : "Cadastro de Disciplinas"}
                            </h1>

                            <p>
                                {id
                                    ? "Atualize as informações da disciplina."
                                    : "Cadastre uma disciplina e defina a pontuação mínima para aprovação."}
                            </p>
                        </div>

                        <div className={styles.icon}>
                            📚
                        </div>
                    </div>

                    <section className={styles.card}>

                        {carregandoDados ? (

                            <p className={styles.loading}>
                                Carregando disciplina...
                            </p>

                        ) : (

                            <form onSubmit={salvarDisciplina}>

                                <div className={styles.formGroup}>
                                    <label htmlFor="nome">
                                        Nome da disciplina
                                    </label>

                                    <input
                                        id="nome"
                                        type="text"
                                        value={nome}
                                        onChange={(event) =>
                                            setNome(event.target.value)
                                        }
                                        placeholder="Ex.: Matemática"
                                        maxLength={100}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="pontuacaoMinima">
                                        Pontuação mínima para passar
                                    </label>

                                    <input
                                        id="pontuacaoMinima"
                                        type="number"
                                        value={pontuacaoMinima}
                                        onChange={(event) =>
                                            setPontuacaoMinima(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Ex.: 6,0"
                                        min="0"
                                        step="0.01"
                                        required
                                    />

                                    <small>
                                        Informe a pontuação mínima exigida para aprovação.
                                    </small>
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
                                                ? "Atualizar disciplina"
                                                : "Cadastrar disciplina"}
                                    </button>

                                    <button
                                        type="button"
                                        className={styles.secondaryButton}
                                        onClick={() =>
                                            router.push("/listadisciplinas")
                                        }
                                    >
                                        Ver lista de disciplinas
                                    </button>

                                </div>

                            </form>

                        )}

                    </section>
                </div>
            </main>
        </>
    );
}

export default function CadDisciplinaPage() {
    return (
        <Suspense
            fallback={
                <div className={styles.loadingPage}>
                    Carregando...
                </div>
            }
        >
            <FormDisciplina />
        </Suspense>
    );
}