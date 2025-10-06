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
  Widget build(BuildContext context) {
    Usuario? usuario = context.read<UserAuthProvider>().usuarioLogado;
    context.read<TransactionProvider>().handleGetAllTransaction(usuario!.uid);
    return SingleChildScrollView(
      child: Column(
        children: [
          Balance(),
          const SizedBox(height: 16),
          context.watch<TransactionProvider>().transactionList.isEmpty
              ? ListaVazia()
              : Graphics(),
          const SizedBox(height: 24),
        ],
      ),
    );
  }
}
