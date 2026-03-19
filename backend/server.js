const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // permite acesso do mobile
app.use(express.json()); // permite receber JSON no body

// 🧠 "Banco de dados" em memória
let items = [];
let id = 1;

// Rota padrão (teste)
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// GET /items → listar hábitos
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items → criar novo hábito
app.post('/items', (req, res) => {
  const { nome } = req.body;

  // validação simples
  if (!nome) {
    return res.status(400).json({ erro: 'Nome é obrigatório' });
  }

  const novoItem = {
    id: id++,
    nome,
    concluido: false
  };

  items.push(novoItem);

  res.status(201).json(novoItem);
});

// iniciar servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});