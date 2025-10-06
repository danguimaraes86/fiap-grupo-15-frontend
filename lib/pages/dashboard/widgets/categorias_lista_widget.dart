import 'package:bytebank/models/transaction_model.dart';
import 'package:flutter/material.dart';

class CategoriasList extends StatelessWidget {
  final List<BytebankTransaction> transactionList;
  final double total;

  const CategoriasList({super.key, required this.transactionList, required this.total});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ...CategoriasType.values
          .where((categoria) => categoria.name != 'entrada')
          .where((categoria) {
              final totalCategoria = transactionList
                  .where((transacao) => transacao.categoria == categoria.name)
                  .fold<double>(0, (sum, item) => sum + item.valor);
              return totalCategoria > 0;
            })
          .map((categoria) {
          final totalCategoria = transactionList
              .where((transacao) => transacao.categoria == categoria.name)
              .fold<double>(0, (sum, item) => sum + item.valor);
          final percentage = (totalCategoria / total * 100);

          return Padding(
            padding: const EdgeInsets.only(bottom: 16),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 12,
                          height: 12,
                          decoration: BoxDecoration(
                            color: categoria.cor,
                            borderRadius: BorderRadius.circular(3),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Text(
                          categoria.descricao,
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w500,
                            color: Theme.of(context).colorScheme.primary,
                          ),
                        ),
                      ],
                    ),
                    Text(
                      'R\$ ${totalCategoria.toStringAsFixed(2)}',
                      style: TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: percentage / 100,
                    backgroundColor: Colors.grey[200],
                    valueColor: AlwaysStoppedAnimation<Color>(categoria.cor),
                    minHeight: 8,
                  ),
                ),
              ],
            ),
          );
        }),
      ],
    );
  }
}
