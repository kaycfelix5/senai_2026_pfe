import db from "../../db/banco";
import { NextResponse } from "next/server";

const DIAS_PERMITIDOS = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo"
];

function respostaErro(mensagem, status = 400) {
    return NextResponse.json(
        { erro: mensagem },
        { status }
    );
}

// VALIDAR OS DADOS DO PROFESSOR
function validarDados(dados) {
    if (
        typeof dados.nome !== "string" ||
        !dados.nome.trim()
    ) {
        return "Informe o nome do professor.";
    }

    if (
        typeof dados.nif !== "string" ||
        !dados.nif.trim()
    ) {
        return "Informe a matrícula (NIF) do professor.";
    }

    if (
        !Array.isArray(dados.dias_aula) ||
        dados.dias_aula.length === 0
    ) {
        return "Selecione pelo menos um dia da semana.";
    }

    const diasInvalidos = dados.dias_aula.some(
        (dia) => !DIAS_PERMITIDOS.includes(dia)
    );

    if (diasInvalidos) {
        return "Um ou mais dias selecionados são inválidos.";
    }

    const idDisciplina = Number(dados.id_disciplina);

    if (
        !Number.isInteger(idDisciplina) ||
        idDisciplina <= 0
    ) {
        return "Selecione uma disciplina válida.";
    }

    const totalAulas = Number(dados.total_aulas_semana);

    if (
        !Number.isInteger(totalAulas) ||
        totalAulas < 1
    ) {
        return "O total de aulas na semana deve ser um número inteiro maior que zero.";
    }

    return null;
}

// CONVERTER OS DIAS DE JSON PARA ARRAY
function converterProfessor(professor) {
    if (!professor) return professor;

    let dias = [];

    try {
        dias = JSON.parse(professor.dias_aula);

        if (!Array.isArray(dias)) {
            dias = [];
        }

    } catch {
        dias = [];
    }

    return {
        ...professor,
        dias_aula: dias
    };
}

// CONSULTA COM INNER JOIN
const consultaProfessor = `
    SELECT
        professores.id_professor,
        professores.nome,
        professores.nif,
        professores.dias_aula,
        professores.id_disciplina,
        professores.total_aulas_semana,
        disciplinas.nome AS disciplina

    FROM professores

    INNER JOIN disciplinas
        ON professores.id_disciplina =
           disciplinas.id_disciplina
`;

// GET - LISTAR OU BUSCAR UM PROFESSOR
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (id !== null) {
            const idNumero = Number(id);

            if (!Number.isInteger(idNumero) || idNumero <= 0) {
                return respostaErro("ID do professor inválido.");
            }

            const professor = db.prepare(`
                ${consultaProfessor}
                WHERE professores.id_professor = ?
            `).get(idNumero);

            if (!professor) {
                return respostaErro(
                    "Professor não encontrado.",
                    404
                );
            }

            return NextResponse.json(
                converterProfessor(professor)
            );
        }

        const professores = db.prepare(`
            ${consultaProfessor}
            ORDER BY professores.nome COLLATE NOCASE
        `).all().map(converterProfessor);

        return NextResponse.json(professores);

    } catch (error) {
        console.error("ERRO GET PROFESSORES:", error);

        return respostaErro(
            "Não foi possível consultar os professores.",
            500
        );
    }
}

// POST - CADASTRAR PROFESSOR
export async function POST(request) {
    try {
        const dados = await request.json();

        const erroValidacao = validarDados(dados);

        if (erroValidacao) {
            return respostaErro(erroValidacao);
        }

        const disciplina = db.prepare(`
            SELECT id_disciplina
            FROM disciplinas
            WHERE id_disciplina = ?
        `).get(Number(dados.id_disciplina));

        if (!disciplina) {
            return respostaErro(
                "A disciplina selecionada não existe.",
                404
            );
        }

        const resultado = db.prepare(`
            INSERT INTO professores (
                nome,
                nif,
                dias_aula,
                id_disciplina,
                total_aulas_semana
            )
            VALUES (?, ?, ?, ?, ?)
        `).run(
            dados.nome.trim(),
            dados.nif.trim(),
            JSON.stringify([...new Set(dados.dias_aula)]),
            Number(dados.id_disciplina),
            Number(dados.total_aulas_semana)
        );

        return NextResponse.json({
            mensagem: "Professor cadastrado com sucesso!",
            id_professor: Number(resultado.lastInsertRowid)
        }, { status: 201 });

    } catch (error) {
        console.error("ERRO POST PROFESSORES:", error);

        if (error.message.includes("UNIQUE constraint failed")) {
            return respostaErro(
                "Já existe um professor cadastrado com esse NIF.",
                409
            );
        }

        if (error.message.includes("FOREIGN KEY constraint failed")) {
            return respostaErro(
                "A disciplina informada não existe.",
                400
            );
        }

        return respostaErro(
            "Não foi possível cadastrar o professor.",
            500
        );
    }
}

// PUT - EDITAR PROFESSOR
export async function PUT(request) {
    try {
        const dados = await request.json();

        const id = Number(dados.id_professor);
        const erroValidacao = validarDados(dados);

        if (!Number.isInteger(id) || id <= 0) {
            return respostaErro(
                "ID do professor não informado ou inválido."
            );
        }

        if (erroValidacao) {
            return respostaErro(erroValidacao);
        }

        const resultado = db.prepare(`
            UPDATE professores
            SET
                nome = ?,
                nif = ?,
                dias_aula = ?,
                id_disciplina = ?,
                total_aulas_semana = ?
            WHERE id_professor = ?
        `).run(
            dados.nome.trim(),
            dados.nif.trim(),
            JSON.stringify([...new Set(dados.dias_aula)]),
            Number(dados.id_disciplina),
            Number(dados.total_aulas_semana),
            id
        );

        if (resultado.changes === 0) {
            return respostaErro(
                "Professor não encontrado.",
                404
            );
        }

        return NextResponse.json({
            mensagem: "Professor atualizado com sucesso!"
        });

    } catch (error) {
        console.error("ERRO PUT PROFESSORES:", error);

        if (error.message.includes("UNIQUE constraint failed")) {
            return respostaErro(
                "Esse NIF já pertence a outro professor.",
                409
            );
        }

        if (error.message.includes("FOREIGN KEY constraint failed")) {
            return respostaErro(
                "A disciplina selecionada não existe.",
                400
            );
        }

        return respostaErro(
            "Não foi possível atualizar o professor.",
            500
        );
    }
}

// DELETE - EXCLUIR PROFESSOR
export async function DELETE(request) {
    try {
        const dados = await request.json();
        const id = Number(dados.id_professor);

        if (!Number.isInteger(id) || id <= 0) {
            return respostaErro(
                "ID do professor não informado ou inválido."
            );
        }

        const resultado = db.prepare(`
            DELETE FROM professores
            WHERE id_professor = ?
        `).run(id);

        if (resultado.changes === 0) {
            return respostaErro(
                "Professor não encontrado.",
                404
            );
        }

        return NextResponse.json({
            mensagem: "Professor excluído com sucesso!"
        });

    } catch (error) {
        console.error("ERRO DELETE PROFESSORES:", error);

        return respostaErro(
            "Não foi possível excluir o professor.",
            500
        );
    }
}