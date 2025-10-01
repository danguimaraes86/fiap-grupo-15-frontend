import 'package:bytebank/models/transaction_model.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class TransactionService {
  static final String _transactionsCollection = 'transactions';

  final _transactionsRef = FirebaseFirestore.instance
      .collection(_transactionsCollection)
      .withConverter<BytebankTransaction>(
        fromFirestore: (doc, options) => BytebankTransaction.fromFirestore(doc),
        toFirestore: (transaction, options) => transaction.toFirestore(),
      );

  Future<DocumentReference<BytebankTransaction>> createNewTransaction(
    BytebankTransaction transaction,
  ) async {
    return await _transactionsRef.add(transaction);
  }

  Future<QuerySnapshot<BytebankTransaction>> getAllTransactions(
    String idUsuario,
  ) async {
    return await _transactionsRef
        .where('idUsuario', isEqualTo: idUsuario)
        .get();
  }
}
