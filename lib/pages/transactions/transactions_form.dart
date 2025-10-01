import 'package:bytebank/configs/routes.dart';
import 'package:bytebank/models/app_colors.dart';
import 'package:bytebank/models/transaction_model.dart';
import 'package:bytebank/models/usuario.dart';
import 'package:bytebank/pages/dashboard/widgets/dashboard_app_bar.dart';
import 'package:bytebank/pages/shared/drawer.dart';
import 'package:bytebank/providers/transaction_provider.dart';
import 'package:bytebank/providers/user_auth_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class TransactionsFormPage extends StatefulWidget {
  const TransactionsFormPage({super.key});
  @override
  State<TransactionsFormPage> createState() => _TransactionsFormPageState();
}

class _TransactionsFormPageState extends State<TransactionsFormPage> {
  final _form = GlobalKey<FormState>();
  final _descricao = TextEditingController();
  final _valor = TextEditingController();
  DateTime _dataCriacao = DateTime.now();
  TransactionType _transactionType = TransactionType.despesa;
  CategoriasType _categoriasType = CategoriasType.alimentacao;

  @override
  void dispose() {
    _descricao.dispose();
    _valor.dispose();
    super.dispose();
  }

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _dataCriacao,
      firstDate: DateTime(2024),
      lastDate: DateTime(2025),
    );
    if (picked != null) setState(() => _dataCriacao = picked);
  }

  void _submit() {
    if (!_form.currentState!.validate()) return;

    if (mounted) {
      Usuario usuario = context.read<UserAuthProvider>().usuarioLogado!;
      context.read<TransactionProvider>().handleNewTransaction(
        BytebankTransaction(
          idUsuario: usuario.uid,
          descricao: _descricao.text,
          valor: double.parse(_valor.text.replaceAll(',', '.')),
          tipoTransacao: _transactionType,
          dataCriacao: _dataCriacao,
          mesReferencia: _dataCriacao.month,
          categoria: _categoriasType.name,
        ),
      );
    }

    // Aqui você chamaria sua API (POST). Vamos simular:
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Transação salva com sucesso.')),
    );
    // Volta para a lista
    Navigator.pushReplacementNamed(context, Routes.dashboard);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.whiteSmoke,
      appBar: DashboardAppBar(title: 'Nova Transação'),
      drawer: const AppDrawer(),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Form(
                key: _form,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    TextFormField(
                      controller: _descricao,
                      decoration: const InputDecoration(
                        labelText: 'Descrição',
                        border: OutlineInputBorder(),
                      ),
                      validator: (v) => (v == null || v.trim().isEmpty)
                          ? 'Informe uma descrição'
                          : null,
                    ),
                    const SizedBox(height: 12),
                    TextFormField(
                      controller: _valor,
                      keyboardType: const TextInputType.numberWithOptions(
                        decimal: true,
                      ),
                      decoration: const InputDecoration(
                        labelText: 'Valor (ex: 123,45)',
                        border: OutlineInputBorder(),
                      ),
                      validator: (v) {
                        if (v == null || v.trim().isEmpty)
                          return 'Informe um valor';
                        final parsed = double.tryParse(v.replaceAll(',', '.'));
                        if (parsed == null || parsed <= 0)
                          return 'Valor inválido';
                        return null;
                      },
                    ),
                    const SizedBox(height: 12),
                    DropdownButtonFormField<CategoriasType>(
                      initialValue: _categoriasType,
                      decoration: const InputDecoration(
                        labelText: 'Categoria',
                        border: OutlineInputBorder(),
                      ),
                      items: CategoriasType.values.map((categoria) {
                        return DropdownMenuItem(
                          value: categoria,
                          child: Text(categoria.descricao),
                        );
                      }).toList(),
                      onChanged: (v) => setState(() {
                        _categoriasType = v!;
                      }),
                    ),
                    const SizedBox(height: 12),
                    DropdownButtonFormField<TransactionType>(
                      initialValue: _transactionType,
                      decoration: const InputDecoration(
                        labelText: 'Tipo',
                        border: OutlineInputBorder(),
                      ),
                      items: TransactionType.values.map((transaction) {
                        return DropdownMenuItem(
                          value: transaction,
                          child: Text(transaction.descricao),
                        );
                      }).toList(),
                      onChanged: (v) => setState(() {
                        _transactionType = v!;
                      }),
                    ),
                    const SizedBox(height: 12),
                    InkWell(
                      onTap: _pickDate,
                      child: InputDecorator(
                        decoration: const InputDecoration(
                          labelText: 'Data',
                          border: OutlineInputBorder(),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              '${_dataCriacao.day.toString().padLeft(2, '0')}/'
                              '${_dataCriacao.month.toString().padLeft(2, '0')}/${_dataCriacao.year}',
                            ),
                            const Icon(Icons.calendar_today, size: 18),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.delftBlue,
                          foregroundColor: Colors.white,
                        ),
                        onPressed: _submit,
                        child: const Text('Salvar'),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
