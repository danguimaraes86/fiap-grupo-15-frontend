import 'package:bytebank/pages/dashboard/widgets/dashboard_lista_vazia.dart';
import 'package:flutter/material.dart';

import 'balance.dart';
import 'graphics.dart';

class DashboardBody extends StatefulWidget {
  const DashboardBody({super.key});

  @override
  State<DashboardBody> createState() => _DashboardBodyState();
}

class _DashboardBodyState extends State<DashboardBody> {
  double receitas = 0.00;
  double despesasTotal = 0.00;

  late List<ExpenseItem> despesas;
  late final double saldo;

  @override
  void initState() {
    super.initState();
    setState(() {
      saldo = receitas - despesasTotal;
      despesas = [];
    });

    // despesas = [
    //   ExpenseItem(
    //     categoria: 'Alimentação',
    //     valor: 800.00,
    //     cor: const Color(0xFFEF4444),
    //   ),
    //   ExpenseItem(
    //     categoria: 'Transporte',
    //     valor: 450.00,
    //     cor: const Color(0xFFF59E0B),
    //   ),
    //   ExpenseItem(
    //     categoria: 'Moradia',
    //     valor: 1200.00,
    //     cor: const Color(0xFF8B5CF6),
    //   ),
    //   ExpenseItem(
    //     categoria: 'Lazer',
    //     valor: 350.00,
    //     cor: const Color(0xFF10B981),
    //   ),
    //   ExpenseItem(
    //     categoria: 'Saúde',
    //     valor: 400.00,
    //     cor: const Color(0xFF3B82F6),
    //   ),
    // ];
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          Balance(saldo: saldo, receitas: receitas, despesas: despesasTotal),
          const SizedBox(height: 16),
          despesas.isEmpty ? ListaVazia() : Graphics(despesas: despesas),
          const SizedBox(height: 24),
        ],
      ),
    );
  }
}
