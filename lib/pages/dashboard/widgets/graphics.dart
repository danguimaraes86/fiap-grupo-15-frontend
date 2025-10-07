import 'package:bytebank/pages/dashboard/widgets/categorias_chart_widget.dart';
import 'package:bytebank/pages/dashboard/widgets/categorias_lista_widget.dart';
import 'package:bytebank/providers/transaction_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Graphics extends StatefulWidget {
  const Graphics({super.key});

  @override
  State<Graphics> createState() => _GraphicsState();
}

class _GraphicsState extends State<Graphics> {
  @override
  Widget build(BuildContext context) {
    final transactionList = context
        .read<TransactionProvider>()
        .transactionList
        .where((transaction) => transaction.categoria != 'entrada').toList();
    final total = transactionList
        .where((transaction) => transaction.categoria != 'entrada')
        .fold<double>(0, (sum, item) => sum + item.valor);

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Despesas por Categoria',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Theme.of(context).colorScheme.primary,
            ),
          ),
          const SizedBox(height: 20),
          CategoriasChart(transactionList: transactionList, total: total),
          const SizedBox(height: 24),
          Divider(color: Theme.of(context).colorScheme.primary, thickness: 1),
          const SizedBox(height: 16),
          CategoriasList(transactionList: transactionList, total: total),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.primary,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Total de Despesas',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Theme.of(context).colorScheme.onPrimary,
                  ),
                ),
                Text(
                  'R\$ ${total.toStringAsFixed(2)}',
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.redAccent,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
