import 'package:bytebank/configs/routes.dart';
import 'package:bytebank/models/transaction.dart';
import 'package:bytebank/models/usuario.dart';
import 'package:bytebank/pages/dashboard/widgets/dashboard_app_bar.dart';
import 'package:bytebank/pages/shared/drawer.dart';
import 'package:bytebank/pages/transactions/models.dart';
import 'package:bytebank/providers/firebase_auth_provider.dart';
import 'package:bytebank/providers/transaction_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class TransactionsFormPage extends StatefulWidget {
  const TransactionsFormPage({super.key});
  @override
  State<TransactionsFormPage> createState() => _TransactionsFormPageState();
}

class _TransactionsFormPageState extends State<TransactionsFormPage> {
  final _form = GlobalKey<FormState>();
  final _description = TextEditingController();
  final _amount = TextEditingController();
  DateTime _date = DateTime.now();
  TransactionType _type = TransactionType.despesa;

  @override
  void dispose() {
    _description.dispose();
    _amount.dispose();
    super.dispose();
  }

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _date,
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
    );
    if (picked != null) setState(() => _date = picked);
  }

  void _submit() {
    if (!_form.currentState!.validate()) return;

    if (mounted) {
      Usuario usuario = context.read<UserAuthProvider>().usuarioLogado!;
      context.read<TransactionProvider>().handleNewTransaction(
        TransactionRequest(
          idUsuario: usuario.uid,
          descricao: _description.text,
          valor: double.parse(_amount.text.replaceAll(',', '.')),
          tipoTransacao: _type,
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
                      controller: _description,
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
                      controller: _amount,
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
                    DropdownButtonFormField<TransactionType>(
                      value: _type,
                      decoration: const InputDecoration(
                        labelText: 'Tipo',
                        border: OutlineInputBorder(),
                      ),
                      items: const [
                        DropdownMenuItem(
                          value: TransactionType.receita,
                          child: Text('Entrada'),
                        ),
                        DropdownMenuItem(
                          value: TransactionType.despesa,
                          child: Text('Saída'),
                        ),
                        // DropdownMenuItem(
                        //   value: TxType.transfer,
                        //   child: Text('Transferência'),
                        // ),
                      ],
                      onChanged: (v) =>
                          setState(() => _type = v ?? TransactionType.despesa),
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
                              '${_date.day.toString().padLeft(2, '0')}/'
                              '${_date.month.toString().padLeft(2, '0')}/${_date.year}',
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
