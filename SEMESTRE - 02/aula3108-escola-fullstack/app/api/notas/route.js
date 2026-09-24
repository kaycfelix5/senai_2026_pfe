import db from "../../db/banco";
import { NextResponse } from "next/server";

// ======================================================
// GET - LISTAR NOTAS
// ======================================================

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        // ==================================================
        // BUSCAR UMA NOTA PELO ID
        // ==================================================

        if (id) {
            const sql = db.prepare(`
                SELECT
                    notas.id_nota,
                    notas.id_aluno,
                    notas.t1,
                    notas.t2,
                    notas.n1,
                    notas.n2,
                    notas.n3,
                    alunos.nome,
                    alunos.ra
                FROM notas
                INNER JOIN alunos
                    ON notas.id_aluno = alunos.id_aluno
                WHERE notas.id_nota = ?
            `);

            const nota = sql.get(Number(id));

            if (!nota) {
                return NextResponse.json(
                    {
                        erro: "Nota não encontrada."
                    },
                    {
                        status: 404
                    }
                );
            }

            return NextResponse.json(nota);
        }

        // ==================================================
        // LISTAR TODAS AS NOTAS
        // ORDENAR PELO NOME DOS ALUNOS
        // ==================================================

        const sql = db.prepare(`
            SELECT
                notas.id_nota,
                notas.id_aluno,
                notas.t1,
                notas.t2,
                notas.n1,
                notas.n2,
                notas.n3,
                alunos.nome,
                alunos.ra
            FROM notas
            INNER JOIN alunos
                ON notas.id_aluno = alunos.id_aluno
            ORDER BY alunos.nome
        `);

        const notas = sql.all();

        return NextResponse.json(notas);

    } catch (error) {
        console.error("ERRO GET NOTAS:", error);

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
// salvaNotas - CADASTRAR NOTAS
// ======================================================

async function salvaNotas(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            INSERT INTO notas
            (
                id_aluno,
                t1,
                t2,
                n1,
                n2,
                n3
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        sql.run(
            dados.id_aluno,
            dados.t1,
            dados.t2,
            dados.n1,
            dados.n2,
            dados.n3
        );

        return NextResponse.json({
            mensagem: "Nota cadastrada com sucesso!"
        });

    } catch (error) {
        console.error("ERRO salvaNotas:", error);

        // Aluno já possui uma nota
        if (
            error.message.includes(
                "UNIQUE constraint failed: notas.id_aluno"
            )
        ) {
            return NextResponse.json(
                {
                    erro: "Este aluno já possui uma nota cadastrada."
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
// POST - CHAMAR salvaNotas
// ======================================================

export async function POST(request) {
    return salvaNotas(request);
}


// ======================================================
// editaNotas - EDITAR NOTAS
// ======================================================

async function editaNotas(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            UPDATE notas
            SET
                id_aluno = ?,
                t1 = ?,
                t2 = ?,
                n1 = ?,
                n2 = ?,
                n3 = ?
            WHERE id_nota = ?
        `);

        const resultado = sql.run(
            dados.id_aluno,
            dados.t1,
            dados.t2,
            dados.n1,
            dados.n2,
            dados.n3,
            dados.id_nota
        );

        if (resultado.changes === 0) {
            return NextResponse.json(
                {
                    erro: "Nota não encontrada."
                },
                {
                    status: 404
                }
            );
        }

        return NextResponse.json({
            mensagem: "Nota atualizada com sucesso!"
        });

    } catch (error) {
        console.error("ERRO editaNotas:", error);

        if (
            error.message.includes(
                "UNIQUE constraint failed: notas.id_aluno"
            )
        ) {
            return NextResponse.json(
                {
                    erro: "Este aluno já possui uma nota cadastrada."
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
// PUT - CHAMAR editaNotas
// ======================================================

export async function PUT(request) {
    return editaNotas(request);
}


// ======================================================
// excluiNotas - EXCLUIR NOTAS
// ======================================================

async function excluiNotas(request) {
    try {
        const dados = await request.json();

        const sql = db.prepare(`
            DELETE FROM notas
            WHERE id_nota = ?
        `);

        const resultado = sql.run(
            dados.id_nota
        );

        if (resultado.changes === 0) {
            return NextResponse.json(
                {
                    erro: "Nota não encontrada."
                },
                {
                    status: 404
                }
            );
        }

        return NextResponse.json({
            mensagem: "Nota excluída com sucesso!"
        });

    } catch (error) {
        console.error("ERRO excluiNotas:", error);

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
// DELETE - CHAMAR excluiNotas
// ======================================================

export async function DELETE(request) {
    return excluiNotas(request);
}