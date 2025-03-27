const db = require('../db/database');

// Buscar hinos ainda não respondidos por um aluno
exports.getNextHinos = (alunoId, limit = 10) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM hinos
      WHERE id NOT IN (
        SELECT hino_id FROM respostas WHERE aluno_id = ?
      )
      ORDER BY id
      LIMIT ?
    `;
    db.all(query, [alunoId, limit], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Buscar gabarito de um hino
exports.getHinoById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM hinos WHERE id = ?`, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Registrar resposta do aluno
exports.salvarResposta = (alunoId, hinoId, resposta) => {
  return new Promise((resolve, reject) => {
    const {
      tonalidade,
      tempo,
      unidade_tempo,
      unidade_de_movimento,
      unidade_de_compasso
    } = resposta;

    const query = `
      INSERT INTO respostas (
        aluno_id, hino_id, tonalidade, tempo, unidade_tempo, unidade_de_movimento, unidade_de_compasso
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [
      alunoId,
      hinoId,
      tonalidade,
      tempo,
      unidade_tempo,
      unidade_de_movimento || '',
      unidade_de_compasso
    ], function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};
