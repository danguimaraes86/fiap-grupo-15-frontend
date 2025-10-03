import 'package:bytebank/models/transaction_model.dart';
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
    final transactionList = context.read<TransactionProvider>().transactionList;
    final total = transactionList.fold<double>(0, (sum, item) => sum + item.valor);

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
          const Text(
            'Despesas por Categoria',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Color(0xFF1F2937),
            ),
          ),
          const SizedBox(height: 20),
          SizedBox(
            height: 200,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: transactionList.map((transacao) {
                final percentage = (transacao.valor / total);
                final height = percentage * 100;

                return Column(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Text(
                      'R\$${transacao.valor.toStringAsFixed(0)}',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        color: CategoriasType.values.byName(transacao.categoria).cor,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      width: 50,
                      height: height,
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [
                            CategoriasType.values.byName(transacao.categoria).cor,
                            CategoriasType.values
                                .byName(transacao.categoria)
                                .cor
                                .withOpacity(0.7),
                          ],
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                        ),
                        borderRadius: const BorderRadius.vertical(
                          top: Radius.circular(8),
                        ),
                      ),
                    ),
                    const SizedBox(height: 8),
                    SizedBox(
                      width: 60,
                      child: Text(
                        CategoriasType.values.byName(transacao.categoria).descricao,
                        textAlign: TextAlign.center,
                        style: const TextStyle(fontSize: 11, color: Color(0xFF6B7280)),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 24),
          const Divider(),
          const SizedBox(height: 16),
          ...transactionList.map((transacao) {
            final percentage = (transacao.valor / total * 100);

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
                              color: CategoriasType.values
                                  .byName(transacao.categoria)
                                  .cor,
                              borderRadius: BorderRadius.circular(3),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Text(
                            CategoriasType.values.byName(transacao.categoria).descricao,
                            style: const TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.w500,
                              color: Color(0xFF374151),
                            ),
                          ),
                        ],
                      ),
                      Text(
                        'R\$ ${transacao.valor.toStringAsFixed(2)}',
                        style: const TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF1F2937),
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
                      valueColor: AlwaysStoppedAnimation<Color>(
                        CategoriasType.values.byName(transacao.categoria).cor,
                      ),
                      minHeight: 8,
                    ),
                  ),
                ],
              ),
            );
          }),
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
                    color: Color.fromARGB(255, 255, 0, 0),
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
