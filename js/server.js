const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./chamados.db');

db.run(`CREATE TABLE IF NOT EXISTS chamados (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  email TEXT,
  tipo TEXT,
  prioridade TEXT,
  descricao TEXT,
  data TEXT
)`);

app.post('/api/chamados', (req, res) => {
  const { nome, email, tipo, prioridade, descricao } = req.body;
  const data = new Date().toLocaleString();

  db.run(`INSERT INTO chamados (nome, email, tipo, prioridade, descricao, data) 
          VALUES (?, ?, ?, ?, ?, ?)`, [nome, email, tipo, prioridade, descricao, data],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
});

app.get('/api/chamados', (req, res) => {
  db.all("SELECT * FROM chamados", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

app.delete('/api/chamados/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM chamados WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Chamado excluído com sucesso' });
  });
});

