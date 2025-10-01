import 'package:bytebank/models/transaction.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class TransactionService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  static final String _transactionsCollection = 'transactions';

  Future<DocumentReference<Map<String, dynamic>>> createNewTransaction(
    TransactionRequest transaction,
  ) async {
    return await _firestore.collection(_transactionsCollection).add({
      'idUsuario': transaction.idUsuario,
      'descricao': transaction.descricao,
      'valor': transaction.valor,
      'tipoTransacao': transaction.tipoTransacao.name,
    });
  }

  Future<QuerySnapshot<Map<String, dynamic>>> getAllTransactions(
    String idUsuario,
  ) async {
    return await _firestore
        .collection(_transactionsCollection)
        .where('idUsuario', isEqualTo: idUsuario)
        .get();
  }
}
