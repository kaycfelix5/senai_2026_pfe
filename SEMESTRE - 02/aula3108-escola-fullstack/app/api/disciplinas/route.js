import db from "../../db/banco";
import { NextResponse } from "next/server";

function respostaErro(mensagem, status = 400) {
    return NextResponse.json(
        { erro: mensagem },
        { status }
    );
}

function nomeValido(nome) {
    return (
        typeof nome === "string" &&
        nome.trim().length > 0
    );
}

function pontuacaoValida(valor) {
    return (
        valor !== "" &&
        valor !== null &&
        valor !== undefined &&
        Number.isFinite(Number(valor)) &&
        Number(valor) >= 0
    );
}

// GET - LISTAR DISCIPLINAS OU BUSCAR PELO ID
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (id !== null) {
            const idNumero = Number(id);

            if (!Number.isInteger(idNumero) || idNumero <= 0) {
                return respostaErro("ID da disciplina inválido.");
            }

            const disciplina = db.prepare(`
                SELECT
                    id_disciplina,
                    nome,
                    pontuacao_minima
                FROM disciplinas
                WHERE id_disciplina = ?
            `).get(idNumero);

            if (!disciplina) {
                return respostaErro(
                    "Disciplina não encontrada.",
                    404
                );
            }

            return NextResponse.json(disciplina);
        }

        const disciplinas = db.prepare(`
            SELECT
                id_disciplina,
                nome,
                pontuacao_minima
            FROM disciplinas
            ORDER BY nome COLLATE NOCASE
        `).all();

        return NextResponse.json(disciplinas);

    } catch (error) {
        console.error("ERRO GET DISCIPLINAS:", error);

        return respostaErro(
            "Não foi possível consultar as disciplinas.",
            500
        );
    }
}

// POST - CADASTRAR DISCIPLINA
export async function POST(request) {
    try {
        const dados = await request.json();

        if (
            !nomeValido(dados.nome) ||
            !pontuacaoValida(dados.pontuacao_minima)
        ) {
            return respostaErro(
                "Informe o nome e uma pontuação mínima válida (maior ou igual a zero)."
            );
        }

        const resultado = db.prepare(`
            INSERT INTO disciplinas (
                nome,
                pontuacao_minima
            )
            VALUES (?, ?)
        `).run(
            dados.nome.trim(),
            Number(dados.pontuacao_minima)
        );

        return NextResponse.json({
            mensagem: "Disciplina cadastrada com sucesso!",
            id_disciplina: Number(resultado.lastInsertRowid)
        }, { status: 201 });

    } catch (error) {
        console.error("ERRO POST DISCIPLINAS:", error);

        if (error.message.includes("UNIQUE constraint failed")) {
            return respostaErro(
                "Já existe uma disciplina com esse nome.",
                409
            );
        }

        return respostaErro(
            "Não foi possível cadastrar a disciplina.",
            500
        );
    }
}

// PUT - EDITAR DISCIPLINA
export async function PUT(request) {
    try {
        const dados = await request.json();
        const id = Number(dados.id_disciplina);

        if (!Number.isInteger(id) || id <= 0) {
            return respostaErro(
                "ID da disciplina não informado ou inválido."
            );
        }

        if (
            !nomeValido(dados.nome) ||
            !pontuacaoValida(dados.pontuacao_minima)
        ) {
            return respostaErro(
                "Informe o nome e uma pontuação mínima válida (maior ou igual a zero)."
            );
        }

        const resultado = db.prepare(`
            UPDATE disciplinas
            SET
                nome = ?,
                pontuacao_minima = ?
            WHERE id_disciplina = ?
        `).run(
            dados.nome.trim(),
            Number(dados.pontuacao_minima),
            id
        );

        if (resultado.changes === 0) {
            return respostaErro(
                "Disciplina não encontrada.",
                404
            );
        }

        return NextResponse.json({
            mensagem: "Disciplina atualizada com sucesso!"
        });

    } catch (error) {
        console.error("ERRO PUT DISCIPLINAS:", error);

        if (error.message.includes("UNIQUE constraint failed")) {
            return respostaErro(
                "Já existe outra disciplina com esse nome.",
                409
            );
        }

        return respostaErro(
            "Não foi possível atualizar a disciplina.",
            500
        );
    }
}

// DELETE - EXCLUIR DISCIPLINA
export async function DELETE(request) {
    try {
        const dados = await request.json();
        const id = Number(dados.id_disciplina);

        if (!Number.isInteger(id) || id <= 0) {
            return respostaErro(
                "ID da disciplina não informado ou inválido."
            );
        }

        const resultado = db.prepare(`
            DELETE FROM disciplinas
            WHERE id_disciplina = ?
        `).run(id);

        if (resultado.changes === 0) {
            return respostaErro(
                "Disciplina não encontrada.",
                404
            );
        }

        return NextResponse.json({
            mensagem: "Disciplina excluída com sucesso!"
        });

    } catch (error) {
        console.error("ERRO DELETE DISCIPLINAS:", error);

        if (error.message.includes("FOREIGN KEY constraint failed")) {
            return respostaErro(
                "Esta disciplina está vinculada a um ou mais professores. Altere ou exclua esses professores antes de excluir a disciplina.",
                409
            );
        }

        return respostaErro(
            "Não foi possível excluir a disciplina.",
            500
        );
    }
}