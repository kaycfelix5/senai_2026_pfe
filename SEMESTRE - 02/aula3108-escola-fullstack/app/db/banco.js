import Database from "better-sqlite3";
import path from "path";

const caminhoBanco = path.join(
    process.cwd(),
    "app",
    "db",
    "escola.db"
);

const db = new Database(caminhoBanco);

db.pragma("foreign_keys = ON");

db.exec(`
    CREATE TABLE IF NOT EXISTS alunos (
        id_aluno INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        idade INTEGER NOT NULL,
        serie TEXT NOT NULL,
        ra TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS notas (
        id_nota INTEGER PRIMARY KEY AUTOINCREMENT,
        id_aluno INTEGER NOT NULL UNIQUE,
        t1 REAL NOT NULL,
        t2 REAL NOT NULL,
        n1 REAL NOT NULL,
        n2 REAL NOT NULL,
        n3 REAL NOT NULL,

        FOREIGN KEY (id_aluno)
        REFERENCES alunos(id_aluno)
        ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS disciplinas (
        id_disciplina INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE,
        pontuacao_minima REAL NOT NULL
            CHECK (pontuacao_minima >= 0)
    );

    CREATE TABLE IF NOT EXISTS professores (
        id_professor INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        nif TEXT NOT NULL UNIQUE,
        dias_aula TEXT NOT NULL,
        id_disciplina INTEGER NOT NULL,
        total_aulas_semana INTEGER NOT NULL
            CHECK (total_aulas_semana >= 1),

        FOREIGN KEY (id_disciplina)
        REFERENCES disciplinas(id_disciplina)
        ON DELETE RESTRICT
    );
`);

console.log("Banco criado com sucesso");

export default db;