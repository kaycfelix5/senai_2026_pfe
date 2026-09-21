import db from "../../db/banco";
import { NextResponse } from "next/server";

// ======================================================
// GET - LISTAR ALUNOS
// ======================================================

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        // Buscar um único aluno
        if (id) {
            const aluno = db
                .prepare(`
                    SELECT *
                    FROM alunos
                    WHERE id_aluno = ?
                `)
                .get(id);

            if (!aluno) {
                return NextResponse.json(
                    {
                        erro: "Aluno não encontrado."
                    },
                    {
                        status: 404
                    }
                );
            }

            return NextResponse.json(aluno);
        }

        // Buscar todos
        const alunos = db
            .prepare(`
                SELECT *
                FROM alunos
                ORDER BY nome
            `)
            .all();

        return NextResponse.json(alunos);

    } catch (error) {

        console.error("ERRO GET ALUNOS:", error);

        return NextResponse.json(
            {
                erro: error.message
            },
            {
                status: 500
            }
        );
    }
}


// ======================================================
// POST - CADASTRAR ALUNO
// ======================================================

export async function POST(request) {
    try {
        const dados = await request.json();

        if (
            !dados.nome ||
            !dados.idade ||
            !dados.serie ||
            !dados.ra
        ) {
            return NextResponse.json(
                {
                    erro: "Preencha todos os campos."
                },
                {
                    status: 400
                }
            );
        }

        const comando = db.prepare(`
            INSERT INTO alunos
            (nome, idade, serie, ra)
            VALUES (?, ?, ?, ?)
        `);

        const resultado = comando.run(
            dados.nome,
            Number(dados.idade),
            dados.serie,
            dados.ra
        );

        return NextResponse.json(
            {
                mensagem: "Aluno cadastrado com sucesso!",
                id_aluno: resultado.lastInsertRowid
            },
            {
                status: 201
            }
        );

    } catch (error) {

        console.error("ERRO POST ALUNOS:", error);

        // RA duplicado
        if (
            error.message.includes("UNIQUE constraint failed")
        ) {
            return NextResponse.json(
                {
                    erro: "Este RA já está cadastrado."
                },
                {
                    status: 409
                }
            );
        }

        return NextResponse.json(
            {
                erro: error.message
            },
            {
                status: 500
            }
        );
    }
}


// ======================================================
// PUT - EDITAR ALUNO
// ======================================================

export async function PUT(request) {
    try {
        const dados = await request.json();

        if (!dados.id_aluno) {
            return NextResponse.json(
                {
                    erro: "ID do aluno não informado."
                },
                {
                    status: 400
                }
            );
        }

        const comando = db.prepare(`
            UPDATE alunos
            SET
                nome = ?,
                idade = ?,
                serie = ?,
                ra = ?
            WHERE id_aluno = ?
        `);

        const resultado = comando.run(
            dados.nome,
            Number(dados.idade),
            dados.serie,
            dados.ra,
            Number(dados.id_aluno)
        );

        if (resultado.changes === 0) {
            return NextResponse.json(
                {
                    erro: "Aluno não encontrado."
                },
                {
                    status: 404
                }
            );
        }

        return NextResponse.json({
            mensagem: "Aluno atualizado com sucesso!"
        });

    } catch (error) {

        console.error("ERRO PUT ALUNOS:", error);

        if (
            error.message.includes("UNIQUE constraint failed")
        ) {
            return NextResponse.json(
                {
                    erro: "Este RA já pertence a outro aluno."
                },
                {
                    status: 409
                }
            );
        }

        return NextResponse.json(
            {
                erro: error.message
            },
            {
                status: 500
            }
        );
    }
}


// ======================================================
// DELETE - EXCLUIR ALUNO
// ======================================================

export async function DELETE(request) {
    try {
        const dados = await request.json();

        if (!dados.id_aluno) {
            return NextResponse.json(
                {
                    erro: "ID do aluno não informado."
                },
                {
                    status: 400
                }
            );
        }

        const comando = db.prepare(`
            DELETE FROM alunos
            WHERE id_aluno = ?
        `);

        const resultado = comando.run(
            Number(dados.id_aluno)
        );

        if (resultado.changes === 0) {
            return NextResponse.json(
                {
                    erro: "Aluno não encontrado."
                },
                {
                    status: 404
                }
            );
        }

        return NextResponse.json({
            mensagem: "Aluno excluído com sucesso!"
        });

    } catch (error) {

        console.error("ERRO DELETE ALUNOS:", error);

        return NextResponse.json(
            {
                erro: error.message
            },
            {
                status: 500
            }
        );
    }
}