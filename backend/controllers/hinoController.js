const hinoModel = require('../models/hinoModel');

// Buscar 10 hinos não respondidos
exports.getHinos = async (req, res) => {
  const { alunoId, nome } = req.query;

  if (!alunoId || !nome) {
    return res.status(400).json({ error: 'Informe o alunoId e nome' });
  }

  // Verifica se aluno existe, se não existir, cria
  const db = require('../db/database');
  db.get(`SELECT * FROM alunos WHERE id = ?`, [alunoId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!row) {
      db.run(`INSERT INTO alunos (id, nome) VALUES (?, ?)`, [alunoId, nome]);
    }
  });

  try {
    const hinos = await hinoModel.getNextHinos(alunoId);
    res.json(hinos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Corrigir e salvar resposta
exports.postResposta = async (req, res) => {
  const { alunoId, hinoId, resposta } = req.body;

  if (!alunoId || !hinoId || !resposta) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  try {
    const gabarito = await hinoModel.getHinoById(hinoId);
    if (!gabarito) return res.status(404).json({ error: 'Hino não encontrado' });

    const resultado = {
      tonalidade: resposta.tonalidade.trim().toLowerCase() === gabarito.tonalidade.trim().toLowerCase(),
      tempo: resposta.tempo.trim() === gabarito.tempo.trim(),
      unidade_tempo: resposta.unidade_tempo.trim().toLowerCase() === gabarito.unidade_tempo.trim().toLowerCase(),
      unidade_de_movimento: true,
      unidade_de_compasso: resposta.unidade_de_compasso.trim().toLowerCase() === gabarito.unidade_de_compasso.trim().toLowerCase()
    };

    // Se for compasso composto, comparar unidade_de_movimento
    const primeiroNumero = parseInt(gabarito.tempo.split('/')[0]);
    if ([6, 9, 12].includes(primeiroNumero)) {
      resultado.unidade_de_movimento =
        resposta.unidade_de_movimento?.trim().toLowerCase() === gabarito.unidade_de_movimento?.trim().toLowerCase();
    }

    await hinoModel.salvarResposta(alunoId, hinoId, resposta);
    res.json({ resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
