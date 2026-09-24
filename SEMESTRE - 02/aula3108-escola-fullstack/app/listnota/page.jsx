'use client'

import { useEffect, useState } from "react";
import Header from "../components/header";
import styles from "./page.module.css";

export default function ListNota() {

    const [notas, setNotas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    // ======================================================
    // CARREGAR NOTAS
    // ======================================================

    async function carregarNotas() {

        try {

            setCarregando(true);
            setErro("");

            const resposta = await fetch(
                "/api/notas",
                {
                    cache: "no-store"
                }
            );

            const texto = await resposta.text();

            console.log("STATUS:", resposta.status);
            console.log("RESPOSTA:", texto);

            if (!texto) {
                throw new Error(
                    "A API de notas não retornou dados."
                );
            }

            const dados = JSON.parse(texto);

            if (!resposta.ok) {
                throw new Error(
                    dados.erro ||
                    "Erro ao carregar notas."
                );
            }

            if (!Array.isArray(dados)) {
                throw new Error(
                    "A API de notas não retornou uma lista."
                );
            }

            setNotas(dados);

        } catch (error) {

            console.error(
                "ERRO AO BUSCAR NOTAS:",
                error
            );

            setErro(error.message);

        } finally {

            setCarregando(false);

        }
    }

    // ======================================================
    // CARREGAR NOTAS AO ABRIR
    // ======================================================

    useEffect(() => {
        carregarNotas();
    }, []);

    // ======================================================
    // EDITAR NOTA
    // ======================================================

    function editarNota(idNota) {

        if (!idNota) {
            setErro("ID da nota não encontrado.");
            return;
        }

        window.location.href =
            `/notaluno?id=${idNota}`;
    }

    // ======================================================
    // EXCLUIR NOTA
    // ======================================================

    async function excluirNota(idNota) {

        const confirmar = window.confirm(
            "Tem certeza que deseja excluir esta nota?"
        );

        if (!confirmar) {
            return;
        }

        try {

            setErro("");

            const resposta = await fetch(
                "/api/notas",
                {
                    method: "DELETE",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        id_nota: Number(idNota)
                    })
                }
            );

            const texto =
                await resposta.text();

            if (!texto) {
                throw new Error(
                    "A API não retornou uma resposta."
                );
            }

            const dados =
                JSON.parse(texto);

            if (!resposta.ok) {
                throw new Error(
                    dados.erro ||
                    "Erro ao excluir nota."
                );
            }

            await carregarNotas();

        } catch (error) {

            console.error(
                "ERRO AO EXCLUIR NOTA:",
                error
            );

            setErro(error.message);
        }
    }

    // ======================================================
    // PEGAR INICIAL
    // ======================================================

    function pegarInicial(nome) {

        if (!nome) {
            return "?";
        }

        return nome
            .charAt(0)
            .toUpperCase();
    }

    // ======================================================
    // TELA
    // ======================================================

    return (
        <>
            <Header />

            <main className={styles.main}>

                <div className={styles.wrapper}>

                    {/* CABEÇALHO */}

                    <div className={styles.pageHeader}>

                        <div>

                            <span className={styles.tag}>
                                NOTAS
                            </span>

                            <h2>
                                Lista de Notas
                            </h2>

                            <p>
                                Visualize as notas dos
                                alunos cadastrados no sistema.
                            </p>

                        </div>

                        <div className={styles.pageIcon}>
                            📝
                        </div>

                    </div>


                    {/* ERRO */}

                    {erro && (

                        <div
                            style={{
                                background: "#fee2e2",
                                color: "#991b1b",
                                border:
                                    "1px solid #fecaca",
                                padding: "12px 16px",
                                borderRadius: "8px",
                                marginBottom: "20px",
                                fontWeight: "600"
                            }}
                        >
                            {erro}
                        </div>

                    )}


                    {/* CARD */}

                    <section className={styles.card}>

                        <div className={styles.cardHeader}>

                            <div>

                                <h3>
                                    Notas cadastradas
                                </h3>

                                <p>
                                    Confira abaixo as notas
                                    dos alunos.
                                </p>

                            </div>

                            <span className={styles.total}>
                                {notas.length}{" "}
                                {notas.length === 1
                                    ? "aluno"
                                    : "alunos"}
                            </span>

                        </div>


                        {/* TABELA */}

                        <div className={styles.tableWrapper}>

                            {carregando ? (

                                <div
                                    style={{
                                        padding: "40px",
                                        textAlign: "center",
                                        color: "#64748b"
                                    }}
                                >
                                    Carregando notas...
                                </div>

                            ) : notas.length === 0 ? (

                                <div
                                    style={{
                                        padding: "40px",
                                        textAlign: "center",
                                        color: "#64748b"
                                    }}
                                >
                                    Nenhuma nota cadastrada.
                                </div>

                            ) : (

                                <table
                                    className={styles.table}
                                >

                                    <thead>

                                        <tr>

                                            <th>ID</th>
                                            <th>Aluno</th>
                                            <th>RA</th>
                                            <th>T1</th>
                                            <th>T2</th>
                                            <th>N1</th>
                                            <th>N2</th>
                                            <th>N3</th>
                                            <th>Ações</th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {notas.map(
                                            (nota) => (

                                                <tr
                                                    key={
                                                        nota.id_nota
                                                    }
                                                >

                                                    {/* ID */}

                                                    <td>

                                                        <span
                                                            className={
                                                                styles.idBadge
                                                            }
                                                        >
                                                            {String(
                                                                nota.id_nota
                                                            ).padStart(
                                                                2,
                                                                "0"
                                                            )}
                                                        </span>

                                                    </td>


                                                    {/* ALUNO */}

                                                    <td>

                                                        <div
                                                            className={
                                                                styles.student
                                                            }
                                                        >

                                                            <div
                                                                className={
                                                                    styles.avatar
                                                                }
                                                            >
                                                                {pegarInicial(
                                                                    nota.nome
                                                                )}
                                                            </div>

                                                            <div>

                                                                <strong>
                                                                    {
                                                                        nota.nome
                                                                    }
                                                                </strong>

                                                                <small>
                                                                    Aluno
                                                                </small>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* RA */}

                                                    <td>
                                                        {nota.ra}
                                                    </td>


                                                    {/* T1 */}

                                                    <td>

                                                        <span
                                                            className={
                                                                styles.grade
                                                            }
                                                        >
                                                            {
                                                                nota.t1
                                                            }
                                                        </span>

                                                    </td>


                                                    {/* T2 */}

                                                    <td>

                                                        <span
                                                            className={
                                                                styles.grade
                                                            }
                                                        >
                                                            {
                                                                nota.t2
                                                            }
                                                        </span>

                                                    </td>


                                                    {/* N1 */}

                                                    <td>

                                                        <span
                                                            className={
                                                                styles.grade
                                                            }
                                                        >
                                                            {
                                                                nota.n1
                                                            }
                                                        </span>

                                                    </td>


                                                    {/* N2 */}

                                                    <td>

                                                        <span
                                                            className={
                                                                styles.grade
                                                            }
                                                        >
                                                            {
                                                                nota.n2
                                                            }
                                                        </span>

                                                    </td>


                                                    {/* N3 */}

                                                    <td>

                                                        <span
                                                            className={
                                                                styles.grade
                                                            }
                                                        >
                                                            {
                                                                nota.n3
                                                            }
                                                        </span>

                                                    </td>


                                                    {/* AÇÕES */}

                                                    <td>

                                                        <div
                                                            style={{
                                                                display:
                                                                    "flex",
                                                                gap:
                                                                    "8px"
                                                            }}
                                                        >

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    editarNota(
                                                                        nota.id_nota
                                                                    )
                                                                }
                                                                style={{
                                                                    border:
                                                                        "none",
                                                                    borderRadius:
                                                                        "6px",
                                                                    padding:
                                                                        "8px 12px",
                                                                    background:
                                                                        "#2563eb",
                                                                    color:
                                                                        "#fff",
                                                                    cursor:
                                                                        "pointer",
                                                                    fontWeight:
                                                                        "700"
                                                                }}
                                                            >
                                                                Editar
                                                            </button>


                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    excluirNota(
                                                                        nota.id_nota
                                                                    )
                                                                }
                                                                style={{
                                                                    border:
                                                                        "none",
                                                                    borderRadius:
                                                                        "6px",
                                                                    padding:
                                                                        "8px 12px",
                                                                    background:
                                                                        "#dc2626",
                                                                    color:
                                                                        "#fff",
                                                                    cursor:
                                                                        "pointer",
                                                                    fontWeight:
                                                                        "700"
                                                                }}
                                                            >
                                                                Excluir
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            )}

                        </div>

                    </section>

                </div>

            </main>
        </>
    );
}