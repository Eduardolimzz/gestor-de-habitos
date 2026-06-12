const app = require('./src/app');
const { port, jwtSecret } = require('./src/config/env');

if (!jwtSecret) {
  throw new Error('JWT_SECRET não definido no arquivo .env');
}

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});