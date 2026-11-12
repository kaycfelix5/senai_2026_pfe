"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import styles from "./page.module.css";

export default function ListaProfessores() {
    const router = useRouter();

    const [professores, setProfessores] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [termoBusca, setTermoBusca] = useState("");

    // BUSCAR PROFESSORES
    const carregarProfessores = useCallback(async () => {
        try {
            setCarregando(true);

            const resposta = await fetch(
                "/api/professores",
                {
                    method: "GET",
                    cache: "no-store"
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    dados.erro || "Erro ao buscar professores."
                );
            }

            setProfessores(
                Array.isArray(dados) ? dados : []
            );

        } catch (error) {
            console.error("Erro ao buscar professores:", error);

            alert(
                error.message || "Erro ao buscar professores."
            );

        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        carregarProfessores();
    }, [carregarProfessores]);

    // EXCLUIR PROFESSOR
    async function excluirProfessor(id_professor) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este professor?"
        );

        if (!confirmar) return;

        try {
            const resposta = await fetch(
                "/api/professores",
                {
                    method: "DELETE",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        id_professor: Number(id_professor)
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                alert(
                    dados.erro || "Erro ao excluir professor."
                );

                return;
            }

            alert(
                dados.mensagem ||
                "Professor excluído com sucesso."
            );

            await carregarProfessores();

        } catch (error) {
            console.error("Erro ao excluir professor:", error);

            alert(
                "Não foi possível comunicar com o servidor."
            );
        }
    }

    // PESQUISAR PROFESSORES
    const termo = termoBusca.trim().toLowerCase();

    const professoresFiltrados = termo.length >= 3
        ? professores.filter((professor) =>
            professor.nome.toLowerCase().includes(termo) ||
            professor.nif.toLowerCase().includes(termo) ||
            professor.disciplina.toLowerCase().includes(termo)
        )
        : professores;

    return (
        <>
            <Header />

            <main className={styles.main}>
                <div className={styles.wrapper}>

                    <div className={styles.pageHeader}>
                        <div>
                            <span className={styles.tag}>
                                PROFESSORES
                            </span>

                            <h1>Lista de Professores</h1>

                            <p>
                                Consulte os professores, suas disciplinas e os dias de aula.
                            </p>
                        </div>

                        <div className={styles.pageIcon}>
                            👨‍🏫
                        </div>
                    </div>

                    <section className={styles.card}>

                        <div className={styles.cardHeader}>

                            <div>
                                <h2>Professores cadastrados</h2>

                                <p>
                                    Os dados da disciplina são carregados pelo relacionamento entre as tabelas.
                                </p>
                            </div>

                            <div className={styles.tools}>

                                <input
                                    type="search"
                                    value={termoBusca}
                                    onChange={(event) =>
                                        setTermoBusca(event.target.value)
                                    }
                                    placeholder="Pesquisar professor..."
                                    aria-label="Pesquisar professor"
                                />

                                <span className={styles.total}>
                                    {professoresFiltrados.length}{" "}
                                    {professoresFiltrados.length === 1
                                        ? "professor"
                                        : "professores"}
                                </span>

                                <button
                                    type="button"
                                    className={styles.addButton}
                                    onClick={() =>
                                        router.push("/cadprofessor")
                                    }
                                >
                                    + Novo professor
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
                                        <th>Professor / NIF</th>
                                        <th>Disciplina</th>
                                        <th>Dias de aula</th>
                                        <th>Aulas / semana</th>
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
                                                Carregando professores...
                                            </td>
                                        </tr>
                                    )}

                                    {!carregando &&
                                        professoresFiltrados.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className={styles.empty}
                                                >
                                                    Nenhum professor encontrado.
                                                </td>
                                            </tr>
                                        )}

                                    {!carregando &&
                                        professoresFiltrados.map((professor) => (

                                            <tr key={professor.id_professor}>

                                                <td>
                                                    <span className={styles.idBadge}>
                                                        {String(
                                                            professor.id_professor
                                                        ).padStart(2, "0")}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className={styles.teacherCell}>

                                                        <div className={styles.avatar}>
                                                            {professor.nome
                                                                ?.charAt(0)
                                                                .toUpperCase() || "P"}
                                                        </div>

                                                        <div>
                                                            <strong>
                                                                {professor.nome}
                                                            </strong>

                                                            <small>
                                                                NIF: {professor.nif}
                                                            </small>
                                                        </div>

                                                    </div>
                                                </td>

                                                <td>
                                                    <span className={styles.subject}>
                                                        {professor.disciplina}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className={styles.days}>
                                                        {Array.isArray(professor.dias_aula) &&
                                                        professor.dias_aula.length > 0
                                                            ? professor.dias_aula.join(", ")
                                                            : "Não informado"}
                                                    </div>
                                                </td>

                                                <td>
                                                    <span className={styles.hours}>
                                                        {professor.total_aulas_semana}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className={styles.actions}>

                                                        <button
                                                            type="button"
                                                            className={styles.editButton}
                                                            onClick={() =>
                                                                router.push(
                                                                    `/cadprofessor?id=${professor.id_professor}`
                                                                )
                                                            }
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className={styles.deleteButton}
                                                            onClick={() =>
                                                                excluirProfessor(
                                                                    professor.id_professor
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