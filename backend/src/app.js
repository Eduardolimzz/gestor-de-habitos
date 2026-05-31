const express = require('express');
const cors = require('cors');
 
const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitRoutes');
const goalRoutes = require('./routes/goalRoutes');
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
app.get('/', (req, res) => {
  res.json({
    message: 'API do Gestor de Hábitos Saudáveis'
  });
});
 
app.use('/auth', authRoutes);
app.use('/habits', habitRoutes);
app.use('/goals', goalRoutes);
 
module.exports = app;