import 'package:bytebank/models/transaction_model.dart';
import 'package:bytebank/services/transaction/transaction_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class TransactionProvider with ChangeNotifier {
  final TransactionService _transactionService = TransactionService();

  double _saldo = 0.0;
  double get saldo => _saldo;
  double _receitas = 0.0;
  double get receitas => _receitas;
  double _despesas = 0.0;
  double get despesas => _despesas;

  List<BytebankTransaction> _transactionList = [];
  List<BytebankTransaction> get transactionList => _transactionList;

  String? _currentUserId;
  String? get currentUserId => _currentUserId;

  Future<void> handleNewTransaction(BytebankTransaction transaction) async {
    final docRef = await _transactionService.createNewTransaction(transaction);

    // Adicionar à lista local com o ID gerado
    final newTransaction = BytebankTransaction(
      id: docRef.id,
      idUsuario: transaction.idUsuario,
      descricao: transaction.descricao,
      valor: transaction.valor,
      dataCriacao: transaction.dataCriacao,
      mesReferencia: transaction.mesReferencia,
      tipoTransacao: transaction.tipoTransacao,
      categoria: transaction.categoria,
      anexoUrl: transaction.anexoUrl,
      anexoNome: transaction.anexoNome,
    );
    _transactionList.add(newTransaction);
    _setTransactions(_transactionList);
    _calcularSaldoReceitaDespesa();
  }

  Future<void> handleUpdateTransaction(BytebankTransaction transaction) async {
    await _transactionService.updateTransaction(transaction);

    // Atualizar na lista local
    final index = _transactionList.indexWhere((t) => t.id == transaction.id);
    if (index != -1) {
      _transactionList[index] = transaction;
    }
    _setTransactions(_transactionList);
    _calcularSaldoReceitaDespesa();
  }

  Future<void> handleDeleteTransaction(String transactionId) async {
    await _transactionService.deleteTransaction(transactionId);

    // Remover da lista local
    _transactionList.removeWhere((transaction) => transaction.id == transactionId);
    _setTransactions(_transactionList);
    _calcularSaldoReceitaDespesa();
  }

  void handleGetAllTransaction(String uid) async {
    if (_currentUserId == uid) return;
    if (_currentUserId != uid) {
      handleLimparSessao();
      _currentUserId = uid;
    }

    QuerySnapshot<BytebankTransaction> transactionList =
        await _transactionService.getAllTransactions(uid);

    if (transactionList.docs.isNotEmpty) {
      _setTransactions(transactionList.docs.map((doc) => doc.data()).toList());
    }
    _calcularSaldoReceitaDespesa();
  }

  void _calcularSaldoReceitaDespesa() {
    _setReceitas(transactionList
        .where((transaction) => transaction.categoria == 'entrada')
        .fold<double>(0, (total, item) => total + item.valor));
    _setDespesas(transactionList
        .where((transaction) => transaction.categoria != 'entrada')
        .fold<double>(0, (total, item) => total + item.valor));
    _setSaldo(_receitas - _despesas);
  }

  void _setTransactions(List<BytebankTransaction> novaLista) {
    _transactionList = novaLista;
    notifyListeners();
  }

  void _setSaldo(double novoSaldo) {
    _saldo = novoSaldo;
  }

  void _setReceitas(double novoValor) {
    _receitas = novoValor;
  }

  void _setDespesas(double novoValor) {
    _despesas = novoValor;
  }

  void handleLimparSessao() {
    _transactionList = [];
    _saldo = 0.0;
    _receitas = 0.0;
    _despesas = 0.0;
    _currentUserId = null;
    notifyListeners();
  }
}
