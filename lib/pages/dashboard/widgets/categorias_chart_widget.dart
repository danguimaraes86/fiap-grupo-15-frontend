import 'package:bytebank/models/transaction_model.dart';
import 'package:flutter/material.dart';

class CategoriasChart extends StatelessWidget {
  const CategoriasChart({super.key, required this.transactionList, required this.total});

  final List<BytebankTransaction> transactionList;
  final double total;

  @override
  Widget build(BuildContext context) {
    double maxHeight = 200;
    double barMaxHeight = 120;

    return SizedBox(
      height: maxHeight,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: CategoriasType.values
            .where((categoria) => categoria.name != 'entrada')
            .where((categoria) {
          final totalCategoria = transactionList
              .where((transacao) => transacao.categoria == categoria.name)
              .fold<double>(0, (sum, item) => sum + item.valor);
          return totalCategoria > 0;
        }).map((categoria) {
          final totalCategoria = transactionList
              .where((transacao) => transacao.categoria == categoria.name)
              .fold<double>(0, (sum, item) => sum + item.valor);

          final percentage = (totalCategoria / total);
          final height = percentage * barMaxHeight;

          return Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Text(
                'R\$${totalCategoria.toStringAsFixed(0)}',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: categoria.cor,
                ),
              ),
              const SizedBox(height: 8),
              Container(
                width: 50,
                height: height,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [categoria.cor, categoria.cor.withOpacity(0.7)],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(8)),
                ),
              ),
              const SizedBox(height: 8),
              SizedBox(
                width: 60,
                child: Text(
                  categoria.descricao,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      fontSize: 12, color: Theme.of(context).colorScheme.primary),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          );
        }).toList(),
      ),
    );
  }
}
