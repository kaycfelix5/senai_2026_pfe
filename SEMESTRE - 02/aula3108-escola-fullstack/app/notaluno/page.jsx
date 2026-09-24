'use client'

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../components/header";
import styles from "./page.module.css";

function CadNota() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const idNota = searchParams.get("id");

    const [alunos, setAlunos] = useState([]);

    const [aluno, setAluno] = useState("");
    const [t1, setT1] = useState("");
    const [t2, setT2] = useState("");
    const [n1, setN1] = useState("");
    const [n2, setN2] = useState("");
    const [n3, setN3] = useState("");

    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    const [carregando, setCarregando] = useState(false);

    // ======================================================
    // CARREGAR ALUNOS
    // ======================================================

    useEffect(() => {

        async function carregarAlunos() {

            try {

                const resposta = await fetch(
                    "/api/alunos",
                    {
                        cache: "no-store"
                    }
                );

                const texto = await resposta.text();

                if (!texto) {

                    throw new Error(
                        "A API de alunos não retornou dados."
                    );

                }

                const dados = JSON.parse(texto);

                if (!resposta.ok) {

                    throw new Error(
                        dados.erro ||
                        "Erro ao carregar alunos."
                    );

                }

                setAlunos(dados);

            } catch (error) {

                console.error(
                    "ERRO AO CARREGAR ALUNOS:",
                    error
                );

                setErro(error.message);

            }
        }

        carregarAlunos();

    }, []);


    // ======================================================
    // CARREGAR NOTA PARA EDIÇÃO
    // ======================================================

    useEffect(() => {

        if (!idNota) {
            return;
        }

        async function carregarNota() {

            try {

                setCarregando(true);
                setErro("");

                const resposta = await fetch(
                    `/api/notas?id=${idNota}`,
                    {
                        cache: "no-store"
                    }
                );

                const texto = await resposta.text();

                if (!texto) {

                    throw new Error(
                        "A API de notas não retornou dados."
                    );

                }

                const dados = JSON.parse(texto);

                if (!resposta.ok) {

                    throw new Error(
                        dados.erro ||
                        "Erro ao carregar a nota."
                    );

                }

                // ------------------------------------------
                // PREENCHER FORMULÁRIO
                // ------------------------------------------

                setAluno(
                    String(dados.id_aluno)
                );

                setT1(
                    String(dados.t1)
                );

                setT2(
                    String(dados.t2)
                );

                setN1(
                    String(dados.n1)
                );

                setN2(
                    String(dados.n2)
                );

                setN3(
                    String(dados.n3)
                );

            } catch (error) {

                console.error(
                    "ERRO AO CARREGAR NOTA:",
                    error
                );

                setErro(error.message);

            } finally {

                setCarregando(false);

            }
        }

        carregarNota();

    }, [idNota]);


    // ======================================================
    // SALVAR / ATUALIZAR
    // ======================================================

    async function salvarNotas(event) {

        event.preventDefault();

        setErro("");
        setMensagem("");

        // ------------------------------------------
        // VALIDAÇÃO
        // ------------------------------------------

        if (
            aluno === "" ||
            t1 === "" ||
            t2 === "" ||
            n1 === "" ||
            n2 === "" ||
            n3 === ""
        ) {

            setErro(
                "Preencha todos os campos."
            );

            return;
        }

        try {

            setCarregando(true);

            let resposta;

            // ==================================================
            // ATUALIZAR
            // ==================================================

            if (idNota) {

                resposta = await fetch(
                    "/api/notas",
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            id_nota:
                                Number(idNota),

                            id_aluno:
                                Number(aluno),

                            t1:
                                Number(t1),

                            t2:
                                Number(t2),

                            n1:
                                Number(n1),

                            n2:
                                Number(n2),

                            n3:
                                Number(n3)

                        })
                    }
                );

            }

            // ==================================================
            // CADASTRAR
            // ==================================================

            else {

                resposta = await fetch(
                    "/api/notas",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            id_aluno:
                                Number(aluno),

                            t1:
                                Number(t1),

                            t2:
                                Number(t2),

                            n1:
                                Number(n1),

                            n2:
                                Number(n2),

                            n3:
                                Number(n3)

                        })
                    }
                );

            }

            // ==================================================
            // LER RESPOSTA
            // ==================================================

            const texto =
                await resposta.text();

            if (!texto) {

                throw new Error(
                    "A API não retornou uma resposta."
                );

            }

            const dados =
                JSON.parse(texto);

            // ==================================================
            // TRATAR ERRO
            // ==================================================

            if (!resposta.ok) {

                throw new Error(
                    dados.erro ||
                    "Erro ao salvar notas."
                );

            }

            // ==================================================
            // SUCESSO
            // ==================================================

            setMensagem(
                dados.mensagem ||
                (
                    idNota
                        ? "Nota atualizada com sucesso!"
                        : "Nota cadastrada com sucesso!"
                )
            );

            // ==================================================
            // APÓS ATUALIZAR
            // ==================================================

            if (idNota) {

                setTimeout(() => {

                    router.push("/listnota");

                }, 800);

            }

            // ==================================================
            // APÓS CADASTRAR
            // ==================================================

            else {

                setAluno("");
                setT1("");
                setT2("");
                setN1("");
                setN2("");
                setN3("");

            }

        } catch (error) {

            console.error(
                "ERRO AO SALVAR NOTAS:",
                error
            );

            setErro(
                error.message
            );

        } finally {

            setCarregando(false);

        }
    }


    // ======================================================
    // LIMPAR
    // ======================================================

    function limparFormulario() {

        setAluno("");
        setT1("");
        setT2("");
        setN1("");
        setN2("");
        setN3("");

        setErro("");
        setMensagem("");
    }


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
                                {idNota
                                    ? "Editar Notas"
                                    : "Cadastro de Notas"}
                            </h2>

                            <p>
                                {idNota
                                    ? "Edite as notas do aluno preenchendo os campos abaixo."
                                    : "Registre as notas do aluno preenchendo os campos abaixo."
                                }
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


                    {/* SUCESSO */}

                    {mensagem && (

                        <div
                            style={{
                                background: "#dcfce7",
                                color: "#166534",
                                border:
                                    "1px solid #bbf7d0",
                                padding: "12px 16px",
                                borderRadius: "8px",
                                marginBottom: "20px",
                                fontWeight: "600"
                            }}
                        >
                            {mensagem}
                        </div>

                    )}


                    <div className={styles.content}>

                        {/* FORMULÁRIO */}

                        <section className={styles.card}>

                            <div className={styles.cardHeader}>

                                <div>

                                    <h3>
                                        Informações das notas
                                    </h3>

                                    <p>
                                        Selecione o aluno e
                                        informe suas respectivas
                                        notas.
                                    </p>

                                </div>

                            </div>


                            <form
                                className={styles.form}
                                onSubmit={salvarNotas}
                            >

                                {/* ALUNO */}

                                <div
                                    className={
                                        styles.fieldFull
                                    }
                                >

                                    <label htmlFor="aluno">
                                        Aluno
                                    </label>

                                    <div
                                        className={
                                            styles.inputWrapper
                                        }
                                    >

                                        <span>
                                            👨‍🎓
                                        </span>

                                        <select
                                            id="aluno"
                                            value={aluno}
                                            onChange={(e) =>
                                                setAluno(
                                                    e.target.value
                                                )
                                            }
                                            disabled={
                                                carregando
                                            }
                                        >

                                            <option value="">
                                                Selecione o aluno
                                            </option>

                                            {alunos.map(
                                                (item) => (

                                                    <option
                                                        key={
                                                            item.id_aluno
                                                        }
                                                        value={
                                                            item.id_aluno
                                                        }
                                                    >
                                                        {item.nome}
                                                        {" - RA: "}
                                                        {item.ra}
                                                    </option>

                                                )
                                            )}

                                        </select>

                                    </div>

                                </div>


                                {/* TRABALHOS */}

                                <div
                                    className={
                                        styles.sectionTitle
                                    }
                                >

                                    <span>
                                        📚
                                    </span>

                                    <div>

                                        <h4>
                                            Trabalhos
                                        </h4>

                                        <p>
                                            Informe as notas dos
                                            trabalhos realizados.
                                        </p>

                                    </div>

                                </div>


                                <div className={styles.row}>

                                    {/* T1 */}

                                    <div
                                        className={
                                            styles.field
                                        }
                                    >

                                        <label htmlFor="t1">
                                            T1 — Trabalho 1
                                        </label>

                                        <div
                                            className={
                                                styles.inputWrapper
                                            }
                                        >

                                            <span>
                                                1️⃣
                                            </span>

                                            <input
                                                id="t1"
                                                type="number"
                                                min="0"
                                                max="10"
                                                step="0.1"
                                                placeholder="0,0"
                                                value={t1}
                                                onChange={(e) =>
                                                    setT1(
                                                        e.target.value
                                                    )
                                                }
                                                disabled={
                                                    carregando
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* T2 */}

                                    <div
                                        className={
                                            styles.field
                                        }
                                    >

                                        <label htmlFor="t2">
                                            T2 — Trabalho 2
                                        </label>

                                        <div
                                            className={
                                                styles.inputWrapper
                                            }
                                        >

                                            <span>
                                                2️⃣
                                            </span>

                                            <input
                                                id="t2"
                                                type="number"
                                                min="0"
                                                max="10"
                                                step="0.1"
                                                placeholder="0,0"
                                                value={t2}
                                                onChange={(e) =>
                                                    setT2(
                                                        e.target.value
                                                    )
                                                }
                                                disabled={
                                                    carregando
                                                }
                                            />

                                        </div>

                                    </div>

                                </div>


                                {/* AVALIAÇÕES */}

                                <div
                                    className={
                                        styles.sectionTitle
                                    }
                                >

                                    <span>
                                        📊
                                    </span>

                                    <div>

                                        <h4>
                                            Avaliações
                                        </h4>

                                        <p>
                                            Informe as notas das
                                            avaliações do aluno.
                                        </p>

                                    </div>

                                </div>


                                <div
                                    className={
                                        styles.gradeGrid
                                    }
                                >

                                    {/* N1 */}

                                    <div
                                        className={
                                            styles.field
                                        }
                                    >

                                        <label htmlFor="n1">
                                            N1 — Nota 1
                                        </label>

                                        <div
                                            className={
                                                styles.inputWrapper
                                            }
                                        >

                                            <span>
                                                📝
                                            </span>

                                            <input
                                                id="n1"
                                                type="number"
                                                min="0"
                                                max="10"
                                                step="0.1"
                                                placeholder="0,0"
                                                value={n1}
                                                onChange={(e) =>
                                                    setN1(
                                                        e.target.value
                                                    )
                                                }
                                                disabled={
                                                    carregando
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* N2 */}

                                    <div
                                        className={
                                            styles.field
                                        }
                                    >

                                        <label htmlFor="n2">
                                            N2 — Nota 2
                                        </label>

                                        <div
                                            className={
                                                styles.inputWrapper
                                            }
                                        >

                                            <span>
                                                📝
                                            </span>

                                            <input
                                                id="n2"
                                                type="number"
                                                min="0"
                                                max="10"
                                                step="0.1"
                                                placeholder="0,0"
                                                value={n2}
                                                onChange={(e) =>
                                                    setN2(
                                                        e.target.value
                                                    )
                                                }
                                                disabled={
                                                    carregando
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* N3 */}

                                    <div
                                        className={
                                            styles.field
                                        }
                                    >

                                        <label htmlFor="n3">
                                            N3 — Nota 3
                                        </label>

                                        <div
                                            className={
                                                styles.inputWrapper
                                            }
                                        >

                                            <span>
                                                📝
                                            </span>

                                            <input
                                                id="n3"
                                                type="number"
                                                min="0"
                                                max="10"
                                                step="0.1"
                                                placeholder="0,0"
                                                value={n3}
                                                onChange={(e) =>
                                                    setN3(
                                                        e.target.value
                                                    )
                                                }
                                                disabled={
                                                    carregando
                                                }
                                            />

                                        </div>

                                    </div>

                                </div>


                                {/* BOTÕES */}

                                <div
                                    className={
                                        styles.actions
                                    }
                                >

                                    <button
                                        type="button"
                                        className={
                                            styles.cancel
                                        }
                                        onClick={
                                            limparFormulario
                                        }
                                        disabled={
                                            carregando
                                        }
                                    >
                                        Limpar
                                    </button>


                                    <button
                                        type="submit"
                                        className={
                                            styles.button
                                        }
                                        disabled={
                                            carregando
                                        }
                                    >

                                        <span>
                                            ✓
                                        </span>

                                        {carregando
                                            ? "Salvando..."
                                            : idNota
                                            ? "Atualizar notas"
                                            : "Cadastrar notas"}

                                    </button>

                                </div>

                            </form>

                        </section>


                        {/* PAINEL LATERAL */}

                        <aside
                            className={
                                styles.infoCard
                            }
                        >

                            <div
                                className={
                                    styles.infoIcon
                                }
                            >
                                📊
                            </div>

                            <h3>
                                Controle de notas
                            </h3>

                            <p>
                                Confira os valores antes de
                                salvar o cadastro das notas
                                do aluno.
                            </p>


                            <div
                                className={
                                    styles.infoItem
                                }
                            >

                                <span>
                                    ✓
                                </span>

                                <div>

                                    <strong>
                                        Aluno
                                    </strong>

                                    <small>
                                        Selecione corretamente
                                        o aluno.
                                    </small>

                                </div>

                            </div>


                            <div
                                className={
                                    styles.infoItem
                                }
                            >

                                <span>
                                    ✓
                                </span>

                                <div>

                                    <strong>
                                        T1 e T2
                                    </strong>

                                    <small>
                                        Notas referentes aos
                                        dois trabalhos.
                                    </small>

                                </div>

                            </div>


                            <div
                                className={
                                    styles.infoItem
                                }
                            >

                                <span>
                                    ✓
                                </span>

                                <div>

                                    <strong>
                                        N1, N2 e N3
                                    </strong>

                                    <small>
                                        Informe as três notas
                                        das avaliações.
                                    </small>

                                </div>

                            </div>


                            <div
                                className={
                                    styles.noteBox
                                }
                            >

                                <span>
                                    ℹ️
                                </span>

                                <p>
                                    As notas devem ser
                                    informadas de acordo
                                    com o sistema de
                                    avaliação da escola.
                                </p>

                            </div>

                        </aside>

                    </div>

                </div>

            </main>

        </>
    );
}

export default function CadNotaPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <CadNota />
        </Suspense>
    );
}