const app = require('./config/express')();

const port = app.get('port');
import './database';

// Start app
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
