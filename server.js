const app = require('./config/express')();

const port = app.get('port');

// Start app
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
