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

  Future<QuerySnapshot<BytebankTransaction>> getAllTransactions(String idUsuario) async {
    return await _transactionsRef.where('idUsuario', isEqualTo: idUsuario).get();
  }

  Future<QuerySnapshot<BytebankTransaction>> getTransactionsPaginated(
    String idUsuario, {
    DocumentSnapshot? lastDocument,
  }) async {
    Query<BytebankTransaction> query = _transactionsRef
        .where('idUsuario', isEqualTo: idUsuario)
        .orderBy('dataCriacao', descending: true)
        .limit(10);

    if (lastDocument != null) {
      query = query.startAfterDocument(lastDocument);
    }

    return await query.get();
  }

  Future<void> updateTransaction(BytebankTransaction transaction) async {
    if (transaction.id == null) {
      throw Exception('ID da transação não pode ser nulo para atualização');
    }
    await _transactionsRef.doc(transaction.id).update(transaction.toFirestore());
  }

  Future<void> deleteTransaction(String transactionId) async {
    await _transactionsRef.doc(transactionId).delete();
  }

  Future<BytebankTransaction?> getTransactionById(String transactionId) async {
    final doc = await _transactionsRef.doc(transactionId).get();
    return doc.exists ? doc.data() : null;
  }
}
