import 'package:bytebank/models/transaction_model.dart';
import 'package:bytebank/services/auth/authentication_service.dart';
import 'package:bytebank/services/transaction/transaction_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class TransactionProvider with ChangeNotifier {
  final TransactionService _transactionService = TransactionService();
  final AuthenticationService _authenticationService = AuthenticationService();

  double _saldo = 0.0;
  double get saldo => _saldo;
  double _receitas = 0.0;
  double get receitas => _receitas;
  double _despesas = 0.0;
  double get despesas => _despesas;

  List<BytebankTransaction> _transactionList = [];
  List<BytebankTransaction> get transactionList => _transactionList;

  void handleNewTransaction(BytebankTransaction transaction) async {
    await _transactionService.createNewTransaction(transaction);
    // await handleGetAllTransaction(_authenticationService.getIdUsuarioLogado());
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
