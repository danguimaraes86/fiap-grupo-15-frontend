import 'package:bytebank/configs/routes.dart';
import 'package:bytebank/models/transaction_model.dart';
import 'package:bytebank/models/usuario_model.dart';
import 'package:bytebank/pages/dashboard/widgets/dashboard_app_bar.dart';
import 'package:bytebank/pages/shared/custom_text_form_field.dart';
import 'package:bytebank/pages/shared/drawer.dart';
import 'package:bytebank/providers/transaction_provider.dart';
import 'package:bytebank/providers/user_auth_provider.dart';
import 'package:bytebank/utils/form_validators.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class TransactionsFormPage extends StatefulWidget {
  const TransactionsFormPage({super.key});
  @override
  State<TransactionsFormPage> createState() => _TransactionsFormPageState();
}

class _TransactionsFormPageState extends State<TransactionsFormPage> {
  final _form = GlobalKey<FormState>();
  final _descricaoController = TextEditingController();
  final _valorController = TextEditingController();
  DateTime _dataCriacaoController = DateTime.now();
  TransactionType _transactionTypeController = TransactionType.receita;
  CategoriasType _categoriasTypeController = CategoriasType.entrada;

  @override
  void dispose() {
    _descricaoController.dispose();
    _valorController.dispose();
    super.dispose();
  }

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _dataCriacaoController,
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
    );
    if (picked != null) setState(() => _dataCriacaoController = picked);
  }

  void _submit() {
    if (!_form.currentState!.validate()) return;

    if (mounted) {
      Usuario usuario = context.read<UserAuthProvider>().usuarioLogado!;

      context.read<TransactionProvider>().handleNewTransaction(
        BytebankTransaction(
          idUsuario: usuario.uid,
          descricao: _descricaoController.text,
          valor: double.parse(_valorController.text.replaceAll(',', '.')),
          tipoTransacao: _transactionTypeController,
          dataCriacao: _dataCriacaoController,
          mesReferencia: _dataCriacaoController.month,
          categoria: _transactionTypeController.name == 'receita'
              ? CategoriasType.entrada.name
              : _categoriasTypeController.name,
        ),
      );
    }

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Transação salva com sucesso!',
          style: TextStyle(color: Theme.of(context).colorScheme.primary),
        ),
        backgroundColor: Colors.lightGreen,
      ),
    );
    Navigator.pushReplacementNamed(context, Routes.dashboard);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.onPrimary,
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
                    CustomTextFormField(
                      controller: _descricaoController,
                      labelText: 'Descrição',
                      prefixIcon: Icons.text_fields,
                      validatores: [(v) => validateCampoObrigatorio(v)],
                    ),

                    const SizedBox(height: 12),
                    CustomTextFormField(
                      controller: _valorController,
                      labelText: 'Valor (ex: 123,45)',
                      prefixIcon: Icons.attach_money,
                      keyboardType: TextInputType.numberWithOptions(decimal: true),
                      validatores: [(v) => validateCampoObrigatorio(v)],
                      inputFormatter: [
                        FilteringTextInputFormatter.allow(RegExp(r'^\d*[.,]?\d*')),
                      ],
                    ),

                    const SizedBox(height: 12),
                    DropdownButtonFormField<TransactionType>(
                      initialValue: _transactionTypeController,
                      decoration: const InputDecoration(
                        labelText: 'Tipo',
                        border: OutlineInputBorder(),
                      ),
                      iconEnabledColor: Theme.of(context).colorScheme.onPrimary,
                      items: TransactionType.values.map((transaction) {
                        return DropdownMenuItem(
                          value: transaction,
                          child: Text(transaction.descricao),
                        );
                      }).toList(),
                      onChanged: (v) => setState(() {
                        _transactionTypeController = v!;
                        _categoriasTypeController = (v == TransactionType.receita)
                            ? CategoriasType.entrada
                            : CategoriasType.alimentacao;
                      }),
                    ),

                    const SizedBox(height: 12),
                    DropdownButtonFormField<CategoriasType>(
                      initialValue: _categoriasTypeController,
                      decoration: InputDecoration(
                        labelText: 'Categoria',
                        border: OutlineInputBorder(),
                      ),
                      iconEnabledColor: Theme.of(context).colorScheme.onPrimary,
                      items: _handleCategoriaItens(),
                      onChanged: (v) => setState(() {
                        _categoriasTypeController = v!;
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
                            Text(DateFormat('dd/MM/yyyy').format(_dataCriacaoController)),
                            Icon(
                              Icons.calendar_today,
                              color: Theme.of(context).colorScheme.onPrimary,
                            ),
                          ],
                        ),
                      ),
                    ),

                    const SizedBox(height: 20),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Theme.of(context).colorScheme.primary,
                          foregroundColor: Theme.of(context).colorScheme.onPrimary,
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

  List<DropdownMenuItem<CategoriasType>> _handleCategoriaItens() {
    return _transactionTypeController.name == 'receita'
        ? CategoriasType.values
              .where((categoria) => categoria == CategoriasType.entrada)
              .map((categoria) {
                return DropdownMenuItem(
                  value: categoria,
                  child: Text(categoria.descricao),
                );
              })
              .toList()
        : CategoriasType.values
              .where((categoria) => categoria != CategoriasType.entrada)
              .map((categoria) {
                return DropdownMenuItem(
                  value: categoria,
                  child: Text(categoria.descricao),
                );
              })
              .toList();
  }
}
