const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(__dirname + '/db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// Middleware: atualiza saldo com base na transação criada
server.post('/transacoes', (req, res, next) => {
  const { usuarioId, tipo, valor } = req.body;
  const db = router.db;

  const saldo = db.get('saldos').find({ usuarioId }).value();

  if (saldo) {
    const novoSaldo =
      tipo === 'Depósito'
        ? saldo.saldo + valor
        : saldo.saldo - valor;

    db.get('saldos')
      .find({ usuarioId })
      .assign({ saldo: novoSaldo })
      .write();
  }

  next(); // continua para salvar a transação normalmente
});

server.use(router);
server.listen(3005, () => {
  console.log('🚀 API JSON Server rodando em http://localhost:3005');
});
