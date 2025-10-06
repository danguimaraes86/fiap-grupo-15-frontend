import 'package:bytebank/models/transaction_model.dart';
import 'package:flutter/material.dart';

class TransactionFiltersCard extends StatelessWidget {
  final bool isOpen;
  final int? selectedMonth;
  final CategoriasType? selectedType;
  final VoidCallback onToggle;
  final Function(int?) onMonthChanged;
  final Function(CategoriasType?) onCategoriaChanged;
  final VoidCallback onApply;
  final VoidCallback onClear;

  const TransactionFiltersCard({
    super.key,
    required this.isOpen,
    required this.selectedMonth,
    required this.selectedType,
    required this.onToggle,
    required this.onMonthChanged,
    required this.onCategoriaChanged,
    required this.onApply,
    required this.onClear,
  });

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Card(
      margin: const EdgeInsets.all(16),
      elevation: 2,
      child: Column(
        children: [
          InkWell(
            onTap: onToggle,
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  Icon(Icons.filter_list, color: colorScheme.onPrimary),
                  const SizedBox(width: 12),
                  Text(
                    'Filtros',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: colorScheme.onPrimary,
                    ),
                  ),
                  const Spacer(),
                  if (selectedMonth != null || selectedType != null)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: colorScheme.primary,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        'Ativos',
                        style: TextStyle(color: colorScheme.onPrimary, fontSize: 12),
                      ),
                    ),
                  const SizedBox(width: 8),
                  Icon(
                    isOpen ? Icons.expand_less : Icons.expand_more,
                    color: colorScheme.onPrimary,
                  ),
                ],
              ),
            ),
          ),
          if (isOpen) ...[
            const Divider(height: 1),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Filtro de Mês
                  Text(
                    'Mês',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: colorScheme.onSurface,
                    ),
                  ),
                  const SizedBox(height: 8),
                  DropdownButtonFormField<int>(
                    value: selectedMonth,
                    decoration: InputDecoration(
                      hintText: 'Selecione o mês',
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                      contentPadding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 8,
                      ),
                    ),
                    items: [
                      const DropdownMenuItem(value: null, child: Text('Todos os meses')),
                      ...List.generate(12, (index) {
                        final month = index + 1;
                        return DropdownMenuItem(
                          value: month,
                          child: Text(_getMonthName(month)),
                        );
                      }),
                    ],
                    onChanged: onMonthChanged,
                  ),
                  const SizedBox(height: 16),

                  // Filtro de Tipo
                  Text(
                    'Categoria',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: colorScheme.onSurface,
                    ),
                  ),
                  const SizedBox(height: 8),
                  DropdownButtonFormField<CategoriasType>(
                    value: selectedType,
                    decoration: InputDecoration(
                      hintText: 'Selecione a categoria',
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
                      contentPadding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 8,
                      ),
                    ),
                    items: [
                      const DropdownMenuItem(value: null, child: Text('Todos os tipos')),
                      ...CategoriasType.values.map((categoria) {
                        return DropdownMenuItem(
                          value: categoria,
                          child: Text(categoria.descricao),
                        );
                      }),
                    ],
                    onChanged: onCategoriaChanged,
                  ),
                  const SizedBox(height: 16),

                  // Botões de Ação
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton(
                          onPressed: onClear,
                          style: ButtonStyle(
                            backgroundColor: WidgetStateProperty.all(Theme.of(context).colorScheme.onPrimary),
                            foregroundColor: WidgetStateProperty.all(Theme.of(context).colorScheme.primary),
                          ),
                          child: Text('Limpar'),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: onApply,
                          style: ButtonStyle(
                            backgroundColor: WidgetStateProperty.all(Theme.of(context).colorScheme.primary),
                            foregroundColor: WidgetStateProperty.all(Theme.of(context).colorScheme.onPrimary),
                          ),
                          child: const Text('Aplicar'),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }

  String _getMonthName(int month) {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    return months[month - 1];
  }
}
