"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../components/header";
import styles from "./page.module.css";

const DIAS_SEMANA = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo"
];

function FormProfessor() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [nome, setNome] = useState("");
    const [nif, setNif] = useState("");
    const [diasAula, setDiasAula] = useState([]);
    const [idDisciplina, setIdDisciplina] = useState("");
    const [totalAulas, setTotalAulas] = useState("");

    const [disciplinas, setDisciplinas] = useState([]);

    const [carregando, setCarregando] = useState(false);
    const [carregandoDados, setCarregandoDados] = useState(true);

    // CARREGAR DISCIPLINAS E DADOS DO PROFESSOR
    useEffect(() => {
        async function carregarDados() {
            try {
                const respostaDisciplinas = await fetch(
                    "/api/disciplinas",
                    { cache: "no-store" }
                );

                const dadosDisciplinas =
                    await respostaDisciplinas.json();

                if (!respostaDisciplinas.ok) {
                    throw new Error(
                        dadosDisciplinas.erro ||
                        "Erro ao carregar disciplinas."
                    );
                }

                setDisciplinas(
                    Array.isArray(dadosDisciplinas)
                        ? dadosDisciplinas
                        : []
                );

                // SE EXISTIR ID, É UMA EDIÇÃO
                if (id) {
                    const respostaProfessor = await fetch(
                        `/api/professores?id=${encodeURIComponent(id)}`,
                        { cache: "no-store" }
                    );

                    const professor =
                        await respostaProfessor.json();

                    if (!respostaProfessor.ok) {
                        alert(
                            professor.erro ||
                            "Professor não encontrado."
                        );

                        router.push("/listaprofessores");
                        return;
                    }

                    setNome(professor.nome ?? "");

                    setNif(professor.nif ?? "");

                    setDiasAula(
                        Array.isArray(professor.dias_aula)
                            ? professor.dias_aula
                            : []
                    );

                    setIdDisciplina(
                        String(professor.id_disciplina ?? "")
                    );

                    setTotalAulas(
                        String(professor.total_aulas_semana ?? "")
                    );
                }

            } catch (error) {
                console.error(
                    "Erro ao carregar dados do formulário:",
                    error
                );

                alert(
                    error.message ||
                    "Erro ao carregar os dados do formulário."
                );

            } finally {
                setCarregandoDados(false);
            }
        }

        carregarDados();

    }, [id, router]);

    // MARCAR OU DESMARCAR DIAS DA SEMANA
    function alterarDia(dia, marcado) {
        setDiasAula((diasAtuais) => {

            if (marcado) {
                return diasAtuais.includes(dia)
                    ? diasAtuais
                    : [...diasAtuais, dia];
            }

            return diasAtuais.filter(
                (diaAtual) => diaAtual !== dia
            );
        });
    }

    // SALVAR PROFESSOR
    async function salvarProfessor(event) {
        event.preventDefault();

        if (diasAula.length === 0) {
            alert("Selecione pelo menos um dia da semana.");
            return;
        }

        if (!idDisciplina) {
            alert(
                "Cadastre e selecione uma disciplina antes de cadastrar o professor."
            );

            return;
        }

        const quantidadeAulas = Number(totalAulas);

        if (
            !Number.isInteger(quantidadeAulas) ||
            quantidadeAulas < 1
        ) {
            alert(
                "Informe um total de aulas na semana maior que zero."
            );

            return;
        }

        setCarregando(true);

        try {
            const dados = {
                nome: nome.trim(),
                nif: nif.trim(),
                dias_aula: diasAula,
                id_disciplina: Number(idDisciplina),
                total_aulas_semana: quantidadeAulas
            };

            const resposta = await fetch("/api/professores", {
                method: id ? "PUT" : "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(
                    id
                        ? {
                            ...dados,
                            id_professor: Number(id)
                        }
                        : dados
                )
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                alert(
                    resultado.erro ||
                    "Erro ao salvar professor."
                );

                return;
            }

            alert(
                resultado.mensagem ||
                "Professor salvo com sucesso!"
            );

            router.push("/listaprofessores");

        } catch (error) {
            console.error("Erro ao salvar professor:", error);

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
                                PROFESSORES
                            </span>

                            <h1>
                                {id
                                    ? "Editar Professor"
                                    : "Cadastro de Professores"}
                            </h1>

                            <p>
                                {id
                                    ? "Atualize os dados e a disciplina do professor."
                                    : "Cadastre o professor, seus dias de aula e a disciplina pela qual é responsável."}
                            </p>
                        </div>

                        <div className={styles.icon}>
                            👨‍🏫
                        </div>
                    </div>

                    <section className={styles.card}>

                        {carregandoDados ? (

                            <p className={styles.loading}>
                                Carregando dados...
                            </p>

                        ) : (

                            <form onSubmit={salvarProfessor}>

                                {/* NOME E NIF */}
                                <div className={styles.formGrid}>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="nome">
                                            Nome do professor
                                        </label>

                                        <input
                                            id="nome"
                                            type="text"
                                            value={nome}
                                            onChange={(event) =>
                                                setNome(event.target.value)
                                            }
                                            placeholder="Digite o nome completo"
                                            maxLength={120}
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="nif">
                                            Matrícula (NIF)
                                        </label>

                                        <input
                                            id="nif"
                                            type="text"
                                            value={nif}
                                            onChange={(event) =>
                                                setNif(event.target.value)
                                            }
                                            placeholder="Digite a matrícula"
                                            maxLength={40}
                                            required
                                        />
                                    </div>

                                </div>

                                {/* DIAS DE AULA */}
                                <div className={styles.formGroup}>

                                    <span className={styles.fieldLabel}>
                                        Dias que ministra aula
                                    </span>

                                    <p className={styles.helper}>
                                        Selecione todos os dias em que o professor dá aulas.
                                    </p>

                                    <div className={styles.daysGrid}>

                                        {DIAS_SEMANA.map((dia) => (

                                            <label
                                                className={styles.dayOption}
                                                key={dia}
                                            >

                                                <input
                                                    type="checkbox"
                                                    checked={diasAula.includes(dia)}
                                                    onChange={(event) =>
                                                        alterarDia(
                                                            dia,
                                                            event.target.checked
                                                        )
                                                    }
                                                />

                                                <span>{dia}</span>

                                            </label>

                                        ))}

                                    </div>
                                </div>

                                {/* DISCIPLINA E CARGA HORÁRIA */}
                                <div className={styles.formGrid}>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="disciplina">
                                            Disciplina que é responsável
                                        </label>

                                        <select
                                            id="disciplina"
                                            value={idDisciplina}
                                            onChange={(event) =>
                                                setIdDisciplina(event.target.value)
                                            }
                                            required
                                        >

                                            <option value="">
                                                Selecione uma disciplina
                                            </option>

                                            {disciplinas.map((disciplina) => (

                                                <option
                                                    key={disciplina.id_disciplina}
                                                    value={disciplina.id_disciplina}
                                                >
                                                    {disciplina.nome}
                                                </option>

                                            ))}

                                        </select>

                                        {disciplinas.length === 0 && (
                                            <small className={styles.warning}>
                                                Nenhuma disciplina cadastrada.
                                                Cadastre uma disciplina primeiro.
                                            </small>
                                        )}
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="totalAulas">
                                            Total de aulas na semana
                                        </label>

                                        <input
                                            id="totalAulas"
                                            type="number"
                                            min="1"
                                            step="1"
                                            value={totalAulas}
                                            onChange={(event) =>
                                                setTotalAulas(event.target.value)
                                            }
                                            placeholder="Ex.: 12"
                                            required
                                        />
                                    </div>

                                </div>

                                {/* BOTÕES */}
                                <div className={styles.buttons}>

                                    <button
                                        type="submit"
                                        className={styles.primaryButton}
                                        disabled={
                                            carregando ||
                                            disciplinas.length === 0
                                        }
                                    >
                                        {carregando
                                            ? "Salvando..."
                                            : id
                                                ? "Atualizar professor"
                                                : "Cadastrar professor"}
                                    </button>

                                    <button
                                        type="button"
                                        className={styles.secondaryButton}
                                        onClick={() =>
                                            router.push("/listaprofessores")
                                        }
                                    >
                                        Ver lista de professores
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

export default function CadProfessorPage() {
    return (
        <Suspense
            fallback={
                <div className={styles.loadingPage}>
                    Carregando...
                </div>
            }
        >
            <FormProfessor />
        </Suspense>
    );
}