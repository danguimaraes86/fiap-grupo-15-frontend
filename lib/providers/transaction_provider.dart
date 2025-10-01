import 'package:bytebank/models/transaction.dart';
import 'package:bytebank/models/usuario.dart';
import 'package:bytebank/services/transaction_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class TransactionProvider with ChangeNotifier {
  late Usuario _usuario;
  late double _saldo;
  List<TransactionResponse> _transactionList = [];

  final TransactionService _service = TransactionService();

  List<TransactionResponse> get transactionList => _transactionList;

  void handleNewTransaction(TransactionRequest transaction) async {
    await _service.createNewTransaction(transaction);
  }

  Future<List<TransactionResponse>> handleGetAllTransaction(String uid) async {
    QuerySnapshot transactionList = await _service.getAllTransactions(uid);
    if (transactionList.docs.isNotEmpty) {
      _transactionList = transactionList.docs.map((doc) {
        final data = doc.data() as Map<String, dynamic>;
        return TransactionResponse(
          id: doc.id,
          idUsuario: data['idUsuario'],
          descricao: data['descricao'],
          valor: data['valor'],
          dataCriacao: (data['dataCriacao'] as Timestamp).toDate(),
          tipoTransacao: TransactionType.values.firstWhere(
            (e) => e.toString().split('.').last == data['tipoTransacao'],
          ),
        );
      }).toList();
    }
    return _transactionList;
  }
}
