const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'hinos.db');
const db = new sqlite3.Database(dbPath);

db.serialize(()=>{
    // Tabela de hinos
    db.run(`
        CREATE TABLE IF NOT EXISTS hinos (
            id INTEGER PRIMARY KEY,
            nome TEXT,
            tonalidade TEXT,
            tempo TEXT,
            unidade_tempo TEXT,
            unidade_de_movimento TEXT,
            unidade_de_compasso TEXT
        )`
    );
    
    // Tabela de Alunos

    db.run(`
        CREATE TABLE IF NOT EXISTS alunos(
            id TEXT PRIMARY KEY,
            nome TEXT
        )
    `);

    // Tabela de respostas

    db.run(`
        CREATE TABLE ID NOT EXISTS respostas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            aluno_id TEXT,
            hino_id INTEGER,
            tonalidade TEXT,
            tempo TEXT,
            unidade_tempo TEXT,
            unidade_de_movimento TEXT,
            unidade_de_compasso TEXT,
            FOREIGN KEY(aluno_id) REFERENCES alunos(id),
            FOREIGN KEY(hino_id) REFERENCES hinos(id)
        )`

    );
});


module.exports = db;