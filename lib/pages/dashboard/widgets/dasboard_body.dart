import 'package:bytebank/models/usuario_model.dart';
import 'package:bytebank/pages/dashboard/widgets/dashboard_lista_vazia.dart';
import 'package:bytebank/providers/transaction_provider.dart';
import 'package:bytebank/providers/user_auth_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'balance.dart';
import 'graphics.dart';

class DashboardBody extends StatefulWidget {
  const DashboardBody({super.key});

  @override
  State<DashboardBody> createState() => _DashboardBodyState();
}

class _DashboardBodyState extends State<DashboardBody> {
  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadTransactions();
    });
  }

  void _loadTransactions() {
    Usuario? usuario = context.read<UserAuthProvider>().usuarioLogado;
    if (usuario != null) {
      context.read<TransactionProvider>().handleGetAllTransaction(usuario.uid);
    }
  }

  @override
  Widget build(BuildContext context) {
    final transactionProvider = context.watch<TransactionProvider>();

    return RefreshIndicator(
      onRefresh: () async {
        _loadTransactions();
      },
      color: Theme.of(context).colorScheme.onPrimary,
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        child: Column(
          children: [
            Balance(),
            const SizedBox(height: 16),
            transactionProvider.transactionList.isEmpty ? ListaVazia() : Graphics(),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}
