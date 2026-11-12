"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import styles from "./page.module.css";

export default function ListaDisciplinas() {
    const router = useRouter();

    const [disciplinas, setDisciplinas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [termoBusca, setTermoBusca] = useState("");

    // BUSCAR DISCIPLINAS
    const carregarDisciplinas = useCallback(async () => {
        try {
            setCarregando(true);

            const resposta = await fetch(
                "/api/disciplinas",
                {
                    method: "GET",
                    cache: "no-store"
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.erro || "Erro ao buscar disciplinas."
                );
            }

            setDisciplinas(
                Array.isArray(dados) ? dados : []
            );

        } catch (error) {
            console.error("Erro ao buscar disciplinas:", error);

            alert(
                error.message || "Erro ao buscar disciplinas."
            );

        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        carregarDisciplinas();
    }, [carregarDisciplinas]);

    // EXCLUIR DISCIPLINA
    async function excluirDisciplina(id_disciplina) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir esta disciplina?"
        );

        if (!confirmar) return;

        try {
            const resposta = await fetch(
                "/api/disciplinas",
                {
                    method: "DELETE",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        id_disciplina: Number(id_disciplina)
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(
                    dados.erro || "Erro ao excluir disciplina."
                );

                return;
            }

            alert(
                dados.mensagem ||
                "Disciplina excluída com sucesso."
            );

            await carregarDisciplinas();

        } catch (error) {
            console.error("Erro ao excluir disciplina:", error);

            alert(
                "Não foi possível comunicar com o servidor."
            );
        }
    }

    // PESQUISAR DISCIPLINAS
    const termo = termoBusca.trim().toLowerCase();

    const disciplinasFiltradas = termo.length >= 3
        ? disciplinas.filter((disciplina) =>
            disciplina.nome.toLowerCase().includes(termo)
        )
        : disciplinas;

    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.wrapper}>

                    <div className={styles.pageHeader}>
                        <div>
                            <span className={styles.tag}>
                                DISCIPLINAS
                            </span>

                            <h1>Lista de Disciplinas</h1>

                            <p>
                                Consulte, edite e exclua as disciplinas cadastradas.
                            </p>
                        </div>

                        <div className={styles.pageIcon}>
                            📚
                        </div>
                    </div>

                    <section className={styles.card}>

                        <div className={styles.cardHeader}>

                            <div>
                                <h2>Disciplinas cadastradas</h2>

                                <p>
                                    Confira o nome e a pontuação mínima de cada disciplina.
                                </p>
                            </div>

                            <div className={styles.tools}>

                                <input
                                    type="search"
                                    value={termoBusca}
                                    onChange={(event) =>
                                        setTermoBusca(event.target.value)
                                    }
                                    placeholder="Pesquisar disciplina..."
                                    aria-label="Pesquisar disciplina"
                                />

                                <span className={styles.total}>
                                    {disciplinasFiltradas.length}{" "}
                                    {disciplinasFiltradas.length === 1
                                        ? "disciplina"
                                        : "disciplinas"}
                                </span>

                                <button
                                    type="button"
                                    className={styles.addButton}
                                    onClick={() =>
                                        router.push("/caddisciplina")
                                    }
                                >
                                    + Nova disciplina
                                </button>

                            </div>
                        </div>

                        {termo.length > 0 && termo.length < 3 && (
                            <p className={styles.hint}>
                                Digite pelo menos 3 caracteres para pesquisar.
                            </p>
                        )}

                        <div className={styles.tableWrapper}>

                            <table className={styles.table}>

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome da disciplina</th>
                                        <th>Pontuação mínima</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {carregando && (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className={styles.empty}
                                            >
                                                Carregando disciplinas...
                                            </td>
                                        </tr>
                                    )}

                                    {!carregando &&
                                        disciplinasFiltradas.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className={styles.empty}
                                                >
                                                    Nenhuma disciplina encontrada.
                                                </td>
                                            </tr>
                                        )}

                                    {!carregando &&
                                        disciplinasFiltradas.map((disciplina) => (

                                            <tr key={disciplina.id_disciplina}>

                                                <td>
                                                    <span className={styles.idBadge}>
                                                        {String(
                                                            disciplina.id_disciplina
                                                        ).padStart(2, "0")}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className={styles.nameCell}>

                                                        <span className={styles.subjectIcon}>
                                                            📖
                                                        </span>

                                                        <strong>
                                                            {disciplina.nome}
                                                        </strong>

                                                    </div>
                                                </td>

                                                <td>
                                                    <span className={styles.score}>
                                                        {Number(
                                                            disciplina.pontuacao_minima
                                                        ).toLocaleString("pt-BR", {
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 2
                                                        })}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className={styles.actions}>

                                                        <button
                                                            type="button"
                                                            className={styles.editButton}
                                                            onClick={() =>
                                                                router.push(
                                                                    `/caddisciplina?id=${disciplina.id_disciplina}`
                                                                )
                                                            }
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className={styles.deleteButton}
                                                            onClick={() =>
                                                                excluirDisciplina(
                                                                    disciplina.id_disciplina
                                                                )
                                                            }
                                                        >
                                                            Excluir
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>

                                        ))}

                                </tbody>
                            </table>
                        </div>

                    </section>
                </div>
            </main>
        </>
    );
}