import 'package:bytebank/models/transaction.dart';
import 'package:bytebank/models/usuario.dart';
import 'package:bytebank/providers/firebase_auth_provider.dart';
import 'package:bytebank/services/transaction_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class TransactionProvider with ChangeNotifier {
  late Usuario _usuario;
  late double _saldo;
  late List<TransactionResponse> _transactionList;

  final TransactionService _service = TransactionService();
  final UserAuthProvider _authProvider = UserAuthProvider();

  List<TransactionResponse> get transactionList => _transactionList;

  void handleNewTransaction(TransactionRequest transaction) async {
    await _service.createNewTransaction(transaction);
  }

  Future<List<TransactionResponse>> handleGetAllTransaction() async {
    QuerySnapshot transactionList = await _service.getAllTransactions(
      _authProvider.usuarioLogado!.uid,
    );

    if (transactionList.docs.isNotEmpty) {
      _transactionList = transactionList.docs.map((doc) {
        final data = doc.data() as TransactionResponse;
        return TransactionResponse(
          id: doc.id,
          idUsuario: data.idUsuario,
          descricao: data.descricao,
          valor: data.valor,
          dataCriacao: data.dataCriacao,
          tipoTransacao: data.tipoTransacao,
        );
      }).toList();
    }
    return _transactionList;
  }
}
