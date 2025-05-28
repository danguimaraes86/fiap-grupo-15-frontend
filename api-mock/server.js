const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(__dirname + '/db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

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

  next();
});

server.delete('/transacoes/:id', (req, res, next) => {
  const db = router.db;
  const transacaoId = Number(req.params.id);
  const transacao = db.get('transacoes').find({ id: transacaoId }).value();

  if (transacao) {
    const { usuarioId, tipo, valor } = transacao;
    const saldo = db.get('saldos').find({ usuarioId }).value();

    if (saldo) {
      const novoSaldo = tipo === 'Depósito'
        ? saldo.saldo - valor
        : saldo.saldo + valor;

      db.get('saldos')
        .find({ usuarioId })
        .assign({ saldo: novoSaldo })
        .write();
    }
  }

  next();
});

server.put('/transacoes/:id', (req, res, next) => {
  const db = router.db;
  const transacaoId = Number(req.params.id);
  const novaTransacao = req.body;

  const transacaoAntiga = db.get('transacoes').find({ id: transacaoId }).value();

  if (transacaoAntiga) {
    const { usuarioId, valor: valorAntigo } = transacaoAntiga;
    const { valor: valorNovo } = novaTransacao;

    const saldo = db.get('saldos').find({ usuarioId }).value();

    if (saldo) {
      const diferenca = valorNovo - valorAntigo;

      const novoSaldo = transacaoAntiga.tipo === 'Depósito'
        ? saldo.saldo + diferenca
        : saldo.saldo - diferenca;

      db.get('saldos')
        .find({ usuarioId })
        .assign({ saldo: novoSaldo })
        .write();
    }
  }

  next();
});

server.use(router);
server.listen(3005, () => {
  console.log('🚀 API JSON Server rodando em http://localhost:3005');
});
