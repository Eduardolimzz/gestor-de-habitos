const express = require('express');
const cors = require('cors');

const habitRoutes = require('./routes/habitRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// rotas
app.use('/habits', habitRoutes);
app.use('/auth', authRoutes);

module.exports = app;