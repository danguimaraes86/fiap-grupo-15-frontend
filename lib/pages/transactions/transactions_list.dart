import 'package:bytebank/models/transaction_model.dart';
import 'package:bytebank/pages/dashboard/widgets/dashboard_app_bar.dart';
import 'package:bytebank/pages/shared/drawer.dart';
import 'package:bytebank/pages/transactions/widgets/transaction_history_card.dart';
import 'package:bytebank/providers/user_auth_provider.dart';
import 'package:bytebank/services/transaction/transaction_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class TransactionsListPage extends StatefulWidget {
  const TransactionsListPage({super.key});
  @override
  State<TransactionsListPage> createState() => _TransactionsListPageState();
}

class _TransactionsListPageState extends State<TransactionsListPage> {
  // bool _filtersOpen = false;
  // int? _month;
  // TxType? _type;

  final _transactionService = TransactionService();
  final _scrollController = ScrollController();

  final List<BytebankTransaction> _transactions = [];
  DocumentSnapshot? _lastDocument;
  bool _isLoading = false;
  bool _hasMore = true;

  @override
  void initState() {
    super.initState();
    _loadFirstPage();
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (_scrollController.position.pixels >=
        _scrollController.position.maxScrollExtent * 0.9) {
      _loadNextPage();
    }
  }

  Future<void> _loadFirstPage() async {
    if (_isLoading) return;

    setState(() {
      _isLoading = true;
      _hasMore = true;
      _transactions.clear();
      _lastDocument = null;
    });

    try {
      final userId = context.read<UserAuthProvider>().usuarioLogado!.uid;
      final snapshot = await _transactionService.getTransactionsPaginated(userId);

      setState(() {
        _transactions.addAll(snapshot.docs.map((doc) => doc.data()).toList());
        _lastDocument = snapshot.docs.isNotEmpty ? snapshot.docs.last : null;
        _hasMore = snapshot.docs.length == 10;
        _isLoading = false;
      });
    } catch (e) {
      setState(() => _isLoading = false);
      if (mounted) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Erro ao carregar transações: $e')));
      }
    }
  }

  Future<void> _loadNextPage() async {
    if (_isLoading || !_hasMore) return;

    setState(() => _isLoading = true);

    try {
      final userId = context.read<UserAuthProvider>().usuarioLogado!.uid;
      final snapshot = await _transactionService.getTransactionsPaginated(
        userId,
        lastDocument: _lastDocument,
      );

      setState(() {
        _transactions.addAll(snapshot.docs.map((doc) => doc.data()).toList());
        _lastDocument = snapshot.docs.isNotEmpty ? snapshot.docs.last : null;
        _hasMore = snapshot.docs.length == 10;
        _isLoading = false;
      });
    } catch (e) {
      setState(() => _isLoading = false);
      if (mounted) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Erro ao carregar mais transações: $e')));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.onPrimary,
      drawer: const AppDrawer(),
      appBar: DashboardAppBar(title: 'Histórico'),
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _loadFirstPage,
          child: _transactions.isEmpty && _isLoading
              ? const Center(child: CircularProgressIndicator())
              : ListView.builder(
                  controller: _scrollController,
                  padding: const EdgeInsets.all(16.0),
                  itemCount: _transactions.length + 1,
                  itemBuilder: (context, index) {
                    if (index >= _transactions.length) {
                      if (_isLoading) {
                        return const Padding(
                          padding: EdgeInsets.symmetric(vertical: 32),
                          child: Center(child: CircularProgressIndicator()),
                        );
                      } else if (!_hasMore) {
                        return Padding(
                          padding: EdgeInsets.symmetric(vertical: 32),
                          child: Center(
                            child: Text(
                              'Fim da lista',
                              style: TextStyle(color: Theme.of(context).colorScheme.primary),
                            ),
                          ),
                        );
                      }
                      return const SizedBox(height: 80);
                    }
                    return TransactionCard(transaction: _transactions[index]);
                  },
                ),
        ),
      ),

      // SafeArea(
      //   child: RefreshIndicator(
      //     onRefresh: _loadFirstPage,
      //     child: CustomScrollView(
      //       controller: _scroll,
      //       slivers: [
      //         SliverAppBar(
      //           title: Text('Histórico de Transações'),
      //           backgroundColor: SystemColors.primary,
      //           foregroundColor: SystemColors.background,
      //           elevation: 0,
      //           floating: true,
      //           snap: true,
      //         ),
      //         SliverToBoxAdapter(
      //           child: FiltersCard(
      //             open: _filtersOpen,
      //             month: _month,
      //             type: _type,
      //             onToggle: () => setState(() => _filtersOpen = !_filtersOpen),
      //             onMonthChanged: (m) => setState(() => _month = m),
      //             onTypeChanged: (t) => setState(() => _type = t),
      //             onApply: _loadFirstPage,
      //             onClear: () {
      //               setState(() {
      //                 _month = null;
      //                 _type = null;
      //               });
      //               _loadFirstPage();
      //             },
      //           ),
      //         ),
      //         SliverPadding(
      //           padding: const EdgeInsets.all(12),
      //           sliver: SliverList.builder(
      //             itemCount: _items.length + (_isLoading || _hasMore ? 1 : 0),
      //             itemBuilder: (context, i) {
      //               if (i >= _items.length) {
      //                 return Padding(
      //                   padding: const EdgeInsets.symmetric(vertical: 24),
      //                   child: Center(
      //                     child: _hasMore
      //                         ? const CircularProgressIndicator()
      //                         : const Text('Fim da lista'),
      //                   ),
      //                 );
      //               }
      //               return _TransactionCard(item: _items[i]);
      //             },
      //           ),
      //         ),
      //       ],
      //     ),
      //   ),
      // ),
    );
  }
}
