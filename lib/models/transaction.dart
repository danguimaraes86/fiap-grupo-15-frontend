class TransactionResponse {
  String id;
  String idUsuario;
  String descricao;
  double valor;
  DateTime dataCriacao;
  TransactionType tipoTransacao;
  // anexoId?: string

  TransactionResponse({
    required this.id,
    required this.idUsuario,
    required this.descricao,
    required this.valor,
    required this.dataCriacao,
    required this.tipoTransacao,
  });

  @override
  String toString() {
    return 'TransactionResponse{id: $id, idUsuario: $idUsuario, descricao: $descricao, valor: $valor, dataCriacao: $dataCriacao, tipoTransacao: $tipoTransacao}';
  }
}

class TransactionRequest {
  String idUsuario;
  String descricao;
  double valor;
  TransactionType tipoTransacao;

  TransactionRequest({
    required this.idUsuario,
    required this.descricao,
    required this.valor,
    required this.tipoTransacao,
  });
}

/// Tipos de transação
enum TransactionType { receita, despesa }
