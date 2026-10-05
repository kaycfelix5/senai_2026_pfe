
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/header";
import styles from "./page.module.css";

export default function ListAluno() {
    const [alunos, setAlunos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [termoBusca, setTermoBusca] = useState("");

    const router = useRouter();

    async function carregarAlunos() {
        try {
            setCarregando(true);

            const resposta = await fetch("/api/alunos", {
                method: "GET",
                cache: "no-store",
            });

            const texto = await resposta.text();

            if (!texto) {
                throw new Error(
                    `A API retornou uma resposta vazia. Status: ${resposta.status}`
                );
            }

            const dados = JSON.parse(texto);

            if (!resposta.ok) {
                throw new Error(
                    dados.erro || "Erro ao buscar alunos."
                );
            }

            setAlunos(Array.isArray(dados) ? dados : []);
        } catch (error) {
            console.error("Erro ao buscar alunos:", error);
            alert(error.message || "Erro ao buscar alunos.");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarAlunos();
    }, []);

    function editarAluno(id_aluno) {
        router.push(`/cadaluno?id=${id_aluno}`);
    }

    async function excluirAluno(id_aluno) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este aluno?"
        );

        if (!confirmar) {
            return;
        }

        try {
            const resposta = await fetch("/api/alunos", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_aluno: Number(id_aluno),
                }),
            });

            const texto = await resposta.text();

            let dados = {};

            if (texto) {
                try {
                    dados = JSON.parse(texto);
                } catch (error) {
                    console.error(
                        "Erro ao interpretar resposta da API:",
                        error
                    );
                }
            }

            if (!resposta.ok) {
                alert(
                    dados.erro ||
                    dados.mensagem ||
                    "Erro ao excluir aluno."
                );
                return;
            }

            alert(
                dados.mensagem ||
                "Aluno excluído com sucesso."
            );

            await carregarAlunos();
        } catch (error) {
            console.error("Erro ao excluir aluno:", error);
            alert("Erro ao excluir aluno.");
        }
    }

    // Pesquisa somente a partir do 3º caractere
    const termo = termoBusca.trim().toLowerCase();

    const alunosFiltrados =
        termo.length >= 3
            ? alunos.filter((aluno) =>
                aluno.nome.toLowerCase().includes(termo)
            )
            : alunos;

    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.wrapper}>

                    <div className={styles.pageHeader}>
                        <div>
                            <span className={styles.tag}>
                                ALUNOS
                            </span>

                            <h2>
                                Lista de Alunos
                            </h2>

                            <p>
                                Visualize os alunos cadastrados no sistema escolar.
                            </p>
                        </div>

                        <div className={styles.pageIcon}>
                            👨‍🎓
                        </div>
                    </div>

                    <section className={styles.card}>

                        <div className={styles.cardHeader}>
                            <div>
                                <h3>
                                    Alunos cadastrados
                                </h3>

                                <p>
                                    Confira abaixo os dados dos alunos.
                                </p>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    flexWrap: "wrap",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <input
                                    type="text"
                                    value={termoBusca}
                                    onChange={(e) =>
                                        setTermoBusca(e.target.value)
                                    }
                                    placeholder="Pesquisar aluno..."
                                    style={{
                                        padding: "10px 14px",
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                        outline: "none",
                                        fontSize: "14px",
                                        minWidth: "230px",
                                    }}
                                />

                                <span className={styles.total}>
                                    {alunosFiltrados.length}{" "}
                                    {alunosFiltrados.length === 1
                                        ? "aluno"
                                        : "alunos"}
                                </span>
                            </div>
                        </div>

                        {termo.length > 0 && termo.length < 3 && (
                            <p
                                style={{
                                    marginTop: "10px",
                                    fontSize: "13px",
                                    color: "#666",
                                }}
                            >
                                Digite pelo menos 3 caracteres para pesquisar.
                            </p>
                        )}

                        <div className={styles.tableWrapper}>

                            <table className={styles.table}>

                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Idade</th>
                                        <th>Série</th>
                                        <th>RA</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {carregando && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className={styles.empty}
                                            >
                                                Carregando alunos...
                                            </td>
                                        </tr>
                                    )}

                                    {!carregando &&
                                        alunosFiltrados.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className={styles.empty}
                                                >
                                                    Nenhum aluno encontrado.
                                                </td>
                                            </tr>
                                        )}

                                    {!carregando &&
                                        alunosFiltrados.map((aluno) => (
                                            <tr key={aluno.id_aluno}>

                                                <td>
                                                    <span className={styles.idBadge}>
                                                        {String(
                                                            aluno.id_aluno
                                                        ).padStart(2, "0")}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className={styles.student}>

                                                        <div className={styles.avatar}>
                                                            {aluno.nome
                                                                ? aluno.nome
                                                                    .charAt(0)
                                                                    .toUpperCase()
                                                                : "A"}
                                                        </div>

                                                        <div>
                                                            <strong>
                                                                {aluno.nome}
                                                            </strong>

                                                            <small>
                                                                Aluno
                                                            </small>
                                                        </div>

                                                    </div>
                                                </td>

                                                <td>
                                                    {aluno.idade} anos
                                                </td>

                                                <td>
                                                    <span className={styles.serie}>
                                                        {aluno.serie}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className={styles.ra}>
                                                        {aluno.ra}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className={styles.actions}>

                                                        <button
                                                            type="button"
                                                            className={styles.editButton}
                                                            onClick={() =>
                                                                editarAluno(
                                                                    aluno.id_aluno
                                                                )
                                                            }
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className={styles.deleteButton}
                                                            onClick={() =>
                                                                excluirAluno(
                                                                    aluno.id_aluno
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

