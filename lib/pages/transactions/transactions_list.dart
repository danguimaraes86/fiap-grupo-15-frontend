import 'package:bytebank/configs/system_colors.dart';
import 'package:bytebank/pages/shared/drawer.dart';
import 'package:bytebank/pages/transactions/models.dart';
import 'package:flutter/material.dart';

class TransactionItem {
  final String id;
  final String title;
  final double amount;
  final DateTime date;
  final TxType type;

  TransactionItem({
    required this.id,
    required this.title,
    required this.amount,
    required this.date,
    required this.type,
  });
}

/// Mock de paginação + filtros
class TransactionsRepository {
  static const int pageSize = 20;

  Future<List<TransactionItem>> fetchPage({
    required int page,
    int? month,
    TxType? type,
  }) async {
    await Future.delayed(const Duration(milliseconds: 600));
    if (page >= 6) return [];
    final start = page * pageSize;

    final generated = List.generate(pageSize, (i) {
      final idx = start + i;
      final d = DateTime.now().subtract(Duration(days: idx));
      final t = TxType.values[idx % TxType.values.length];
      return TransactionItem(
        id: 'tx_$idx',
        title: 'Transação #$idx',
        amount: (idx + 1) * 2.75,
        date: d,
        type: t,
      );
    });

    return generated.where((it) {
      final okMonth = month == null || it.date.month == month;
      final okType = type == null || it.type == type;
      return okMonth && okType;
    }).toList();
  }
}

class TransactionsListPage extends StatefulWidget {
  const TransactionsListPage({super.key});
  @override
  State<TransactionsListPage> createState() => _TransactionsListPageState();
}

class _TransactionsListPageState extends State<TransactionsListPage> {
  final _repo = TransactionsRepository();
  final _items = <TransactionItem>[];
  final _scroll = ScrollController();

  bool _isLoading = false, _hasMore = true;
  int _page = 0;

  bool _filtersOpen = false;
  int? _month;
  TxType? _type;

  @override
  void initState() {
    super.initState();
    _loadFirstPage();
    _scroll.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scroll.dispose();
    super.dispose();
  }

  Future<void> _loadFirstPage() async {
    setState(() {
      _isLoading = true;
      _hasMore = true;
      _page = 0;
      _items.clear();
    });
    final data = await _repo.fetchPage(page: _page, month: _month, type: _type);
    setState(() {
      _items.addAll(data);
      _isLoading = false;
      _hasMore = data.length == TransactionsRepository.pageSize;
    });
  }

  Future<void> _loadNextPage() async {
    if (_isLoading || !_hasMore) return;
    setState(() => _isLoading = true);
    final next = _page + 1;
    final data = await _repo.fetchPage(page: next, month: _month, type: _type);
    setState(() {
      _page = next;
      _items.addAll(data);
      _isLoading = false;
      _hasMore = data.length == TransactionsRepository.pageSize;
    });
  }

  void _onScroll() {
    if (!_scroll.hasClients) return;
    if (_scroll.position.pixels + 200 >= _scroll.position.maxScrollExtent) {
      _loadNextPage();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.whiteSmoke,
      drawer: const AppDrawer(),
      //bottomNavigationBar: const BottomNav(currentIndex: 0),
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _loadFirstPage,
          child: CustomScrollView(
            controller: _scroll,
            slivers: [
              SliverAppBar(
                title: Text('Histórico de Transações'),
                backgroundColor: SystemColors.primary,
                foregroundColor: SystemColors.background,
                elevation: 0,
                floating: true,
                snap: true,
              ),
              SliverToBoxAdapter(
                child: _FiltersCard(
                  open: _filtersOpen,
                  month: _month,
                  type: _type,
                  onToggle: () => setState(() => _filtersOpen = !_filtersOpen),
                  onMonthChanged: (m) => setState(() => _month = m),
                  onTypeChanged: (t) => setState(() => _type = t),
                  onApply: _loadFirstPage,
                  onClear: () {
                    setState(() {
                      _month = null;
                      _type = null;
                    });
                    _loadFirstPage();
                  },
                ),
              ),
              SliverPadding(
                padding: const EdgeInsets.all(12),
                sliver: SliverList.builder(
                  itemCount: _items.length + (_isLoading || _hasMore ? 1 : 0),
                  itemBuilder: (context, i) {
                    if (i >= _items.length) {
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 24),
                        child: Center(
                          child: _hasMore
                              ? const CircularProgressIndicator()
                              : const Text('Fim da lista'),
                        ),
                      );
                    }
                    return _TransactionCard(item: _items[i]);
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// ----- filtro recolhível -----
class _FiltersCard extends StatelessWidget {
  final bool open;
  final int? month;
  final TxType? type;
  final VoidCallback onToggle, onApply, onClear;
  final ValueChanged<int?> onMonthChanged;
  final ValueChanged<TxType?> onTypeChanged;

  const _FiltersCard({
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
          crossFadeState: open
              ? CrossFadeState.showSecond
              : CrossFadeState.showFirst,
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
                      child: _MonthDropdown(
                        value: month,
                        onChanged: onMonthChanged,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: _TypeDropdown(
                        value: type,
                        onChanged: onTypeChanged,
                      ),
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
      decoration: const InputDecoration(
        labelText: 'Mês',
        border: OutlineInputBorder(),
      ),
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
      decoration: const InputDecoration(
        labelText: 'Tipo',
        border: OutlineInputBorder(),
      ),
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

/// ----- Card “cartão” -----
class _TransactionCard extends StatelessWidget {
  final TransactionItem item;
  const _TransactionCard({required this.item});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: AppColors.frenchGray.withOpacity(.35),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(
                Icons.receipt_long,
                color: AppColors.delftBlue,
                size: 22,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    item.title,
                    style: const TextStyle(
                      color: AppColors.delftBlue,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    _fmtDate(item.date),
                    style: const TextStyle(color: AppColors.paynesGray),
                  ),
                ],
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                const SizedBox(height: 2),
                Text(
                  'R\$ ${item.amount.toStringAsFixed(2)}',
                  style: const TextStyle(
                    fontWeight: FontWeight.w800,
                    fontSize: 16,
                    color: AppColors.delftBlue,
                  ),
                ),
                const SizedBox(height: 6),
                Container(
                  decoration: BoxDecoration(
                    color: txTypeBg(item.type),
                    borderRadius: BorderRadius.circular(999),
                    border: Border.all(
                      color: AppColors.frenchGray.withOpacity(.5),
                    ),
                  ),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 4,
                  ),
                  child: Text(
                    txTypeLabel(item.type),
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      color: txTypeFg(item.type),
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  String _fmtDate(DateTime d) =>
      '${d.day.toString().padLeft(2, '0')}/${d.month.toString().padLeft(2, '0')}/${d.year}';
}
