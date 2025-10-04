import 'package:bytebank/pages/transactions/models.dart';
import 'package:flutter/material.dart';

class FiltersCard extends StatelessWidget {
  final bool open;
  final int? month;
  final TxType? type;
  final VoidCallback onToggle, onApply, onClear;
  final ValueChanged<int?> onMonthChanged;
  final ValueChanged<TxType?> onTypeChanged;

  const FiltersCard({
    super.key,
    required this.open,
    required this.month,
    required this.type,
    required this.onToggle,
    required this.onMonthChanged,
    required this.onTypeChanged,
    required this.onApply,
    required this.onClear,
  });

  @override
  Widget build(BuildContext context) {
    final labelStyle = Theme.of(context).textTheme.labelMedium;
    return Padding(
      padding: const EdgeInsets.fromLTRB(12, 12, 12, 4),
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: AnimatedCrossFade(
          duration: const Duration(milliseconds: 180),
          crossFadeState: open ? CrossFadeState.showSecond : CrossFadeState.showFirst,
          firstChild: InkWell(
            borderRadius: BorderRadius.circular(12),
            onTap: onToggle,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              child: Row(
                children: [
                  const Icon(Icons.filter_alt_outlined),
                  const SizedBox(width: 12),
                  const Expanded(child: Text('Filtro Mensal / Tipo')),
                  Text(_summary(), style: labelStyle),
                  const SizedBox(width: 8),
                  const Icon(Icons.keyboard_arrow_down),
                ],
              ),
            ),
          ),
          secondChild: Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
            child: Column(
              children: [
                Row(
                  children: [
                    Expanded(
                      child: _MonthDropdown(value: month, onChanged: onMonthChanged),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: _TypeDropdown(value: type, onChanged: onTypeChanged),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: onClear,
                        icon: const Icon(Icons.clear),
                        label: const Text('Limpar'),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: ElevatedButton.icon(
                        onPressed: onApply,
                        icon: const Icon(Icons.check),
                        label: const Text('Aplicar'),
                      ),
                    ),
                  ],
                ),
                IconButton(
                  onPressed: onToggle,
                  icon: const Icon(Icons.keyboard_arrow_up),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  String _summary() {
    final m = month == null ? 'Mês: todos' : 'Mês: $month';
    final t = type == null ? 'Tipo: todos' : 'Tipo: ${txTypeLabel(type!)}';
    return '$m | $t';
  }
}

class _MonthDropdown extends StatelessWidget {
  final int? value;
  final ValueChanged<int?> onChanged;
  const _MonthDropdown({required this.value, required this.onChanged});

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField<int?>(
      value: value,
      decoration: const InputDecoration(labelText: 'Mês', border: OutlineInputBorder()),
      items: const [
        DropdownMenuItem(value: null, child: Text('Todos')),
        DropdownMenuItem(value: 1, child: Text('01')),
        DropdownMenuItem(value: 2, child: Text('02')),
        DropdownMenuItem(value: 3, child: Text('03')),
        DropdownMenuItem(value: 4, child: Text('04')),
        DropdownMenuItem(value: 5, child: Text('05')),
        DropdownMenuItem(value: 6, child: Text('06')),
        DropdownMenuItem(value: 7, child: Text('07')),
        DropdownMenuItem(value: 8, child: Text('08')),
        DropdownMenuItem(value: 9, child: Text('09')),
        DropdownMenuItem(value: 10, child: Text('10')),
        DropdownMenuItem(value: 11, child: Text('11')),
        DropdownMenuItem(value: 12, child: Text('12')),
      ],
      onChanged: onChanged,
    );
  }
}

class _TypeDropdown extends StatelessWidget {
  final TxType? value;
  final ValueChanged<TxType?> onChanged;
  const _TypeDropdown({required this.value, required this.onChanged});

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField<TxType?>(
      value: value,
      decoration: const InputDecoration(labelText: 'Tipo', border: OutlineInputBorder()),
      items: const [
        DropdownMenuItem(value: null, child: Text('Todos')),
        DropdownMenuItem(value: TxType.income, child: Text('Entrada')),
        DropdownMenuItem(value: TxType.expense, child: Text('Saída')),
        DropdownMenuItem(value: TxType.transfer, child: Text('Transferência')),
      ],
      onChanged: onChanged,
    );
  }
}
