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

  Future<List<BytebankTransaction>> handleGetAllTransaction(String uid) async {
    QuerySnapshot<BytebankTransaction> transactionList =
        await _transactionService.getAllTransactions(uid);

    if (transactionList.docs.isNotEmpty) {
      _setTransactions(transactionList.docs.map((doc) => doc.data()).toList());
    }
    _calcularSaldoReceitaDespesa();
    return _transactionList;
  }

  void _calcularSaldoReceitaDespesa() {
    _setSaldo(
      _transactionList.fold<double>(0.0, (total, transaction) {
        return transaction.tipoTransacao == TransactionType.receita
            ? total + transaction.valor
            : total - transaction.valor;
      }),
    );
    _setReceitas(
      _transactionList.fold<double>(0.0, (total, transaction) {
        return transaction.tipoTransacao == TransactionType.receita
            ? total + transaction.valor
            : total;
      }),
    );
    _setDespesas(
      _transactionList.fold<double>(0.0, (total, transaction) {
        return transaction.tipoTransacao == TransactionType.despesa
            ? total + transaction.valor
            : total;
      }),
    );
  }

  void _setTransactions(List<BytebankTransaction> novaLista) {
    _transactionList = novaLista;
    notifyListeners();
  }

  void _setSaldo(double novoSaldo) {
    _saldo = novoSaldo;
    notifyListeners();
  }

  void _setReceitas(double novoValor) {
    _receitas = novoValor;
    notifyListeners();
  }

  void _setDespesas(double novoValor) {
    _despesas = novoValor;
    notifyListeners();
  }
}
