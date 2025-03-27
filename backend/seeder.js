const db = require('./db/database');

const hinos = [
  {
    id: 1,
    nome: "Grandioso és Tu",
    tonalidade: "D",
    tempo: "4/4",
    unidade_tempo: "semínima",
    unidade_de_movimento: "",
    unidade_de_compasso: "semibreve"
  },
  {
    id: 2,
    nome: "Mais perto quero estar",
    tonalidade: "E",
    tempo: "3/4",
    unidade_tempo: "semínima",
    unidade_de_movimento: "",
    unidade_de_compasso: "semínima pontuada"
  },
  {
    id: 3,
    nome: "Faz-nos ouvir Tua voz",
    tonalidade: "G",
    tempo: "4/4",
    unidade_tempo: "semínima",
    unidade_de_movimento: "",
    unidade_de_compasso: "semibreve"
  },
  {
    id: 4,
    nome: "ouve a nossa oração",
    tonalidade: "Lá bemol",
    tempo: "6/4",
    unidade_tempo: "mínima pontuada",
    unidade_de_movimento: "semínima",
    unidade_de_compasso: "mínima pontuada ligada a uma seminima pontuada"
  }
];

hinos.forEach(hino => {
  const query = `
    INSERT OR IGNORE INTO hinos 
    (id, nome, tonalidade, tempo, unidade_tempo, unidade_de_movimento, unidade_de_compasso)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    hino.id,
    hino.nome,
    hino.tonalidade,
    hino.tempo,
    hino.unidade_tempo,
    hino.unidade_de_movimento,
    hino.unidade_de_compasso
  ];

  db.run(query, params, (err) => {
    if (err) {
      console.error('Erro ao inserir hino:', err.message);
    }
  });
});

console.log('🎵 Hinos inseridos com sucesso!');
