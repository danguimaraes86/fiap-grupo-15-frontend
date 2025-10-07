import 'package:bytebank/pages/dashboard/widgets/dashboard_app_bar.dart';
import 'package:bytebank/pages/shared/drawer.dart';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'dart:io';
import 'package:provider/provider.dart';
import 'package:bytebank/models/transaction_model.dart';
import 'package:bytebank/providers/transaction_provider.dart';
import 'package:intl/intl.dart';
import 'package:file_picker/file_picker.dart';
import 'package:bytebank/services/storage/storage_service.dart';
import 'package:bytebank/providers/user_auth_provider.dart';

class TransactionsFormPage extends StatefulWidget {
  const TransactionsFormPage({super.key});

  @override
  State<TransactionsFormPage> createState() => _TransactionsFormPageState();
}

class _TransactionsFormPageState extends State<TransactionsFormPage> {
  final _formKey = GlobalKey<FormState>();
  final _descricaoController = TextEditingController();
  final _valorController = TextEditingController();
  final _dataController = TextEditingController();

  TransactionType? _transactionTypeController;
  CategoriasType? _selectedCategoria;

  PlatformFile? _selectedFile;
  bool _isUploading = false;

  final StorageService _storageService = StorageService();

  @override
  void dispose() {
    _descricaoController.dispose();
    _valorController.dispose();
    _dataController.dispose();
    super.dispose();
  }

  Future<void> _pickFile() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
      );

      if (result != null) {
        setState(() {
          _selectedFile = result.files.first;
        });
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erro ao selecionar arquivo: \$e')),
        );
      }
    }
  }

  void _removeFile() {
    setState(() {
      _selectedFile = null;
    });
  }

  Future<void> _selectDate() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
    );

    if (picked != null) {
      setState(() {
        _dataController.text = DateFormat('dd/MM/yyyy').format(picked);
      });
    }
  }

  Future<void> _submit() async {
    if (_formKey.currentState?.validate() ?? false) {
      setState(() {
        _isUploading = true;
      });

      try {
        final userProvider = Provider.of<UserAuthProvider>(context, listen: false);
        final userId = userProvider.usuarioLogado?.uid ?? '';

        String? anexoUrl;
        String? anexoNome;

        if (_selectedFile != null) {
          final String sanitizedName = _selectedFile!.name
              .replaceAll(' ', '_')
              .replaceAll(RegExp(r'[^\w\s\-\.]'), '');
          final String fileName =
              '${DateTime.now().millisecondsSinceEpoch}_$sanitizedName';
          final String tempTransactionId =
              DateTime.now().millisecondsSinceEpoch.toString();

          if (kIsWeb) {
            if (_selectedFile!.bytes != null) {
              anexoUrl = await _storageService.uploadFile(
                userId: userId,
                transactionId: tempTransactionId,
                file: _selectedFile!.bytes!,
                fileName: fileName,
              );
            }
          } else {
            if (_selectedFile!.path != null) {
              anexoUrl = await _storageService.uploadFile(
                userId: userId,
                transactionId: tempTransactionId,
                file: File(_selectedFile!.path!),
                fileName: fileName,
              );
            }
          }
          anexoNome = _selectedFile!.name;
        }

        final newTransaction = BytebankTransaction(
          idUsuario: userId,
          descricao: _descricaoController.text,
          valor: double.parse(_valorController.text),
          dataCriacao: DateFormat('dd/MM/yyyy').parse(_dataController.text),
          mesReferencia: DateFormat('dd/MM/yyyy').parse(_dataController.text).month,
          tipoTransacao: _transactionTypeController!,
          categoria: _selectedCategoria!.name,
          anexoUrl: anexoUrl,
          anexoNome: anexoNome,
        );

        if (mounted) {
          await context.read<TransactionProvider>().handleNewTransaction(newTransaction);

          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Transação criada com sucesso!')),
            );

            // Redireciona para a lista de transações
            Navigator.of(context).pushReplacementNamed('/list');
          }
        }
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Erro ao criar transação: \$e')),
          );
        }
      } finally {
        if (mounted) {
          setState(() {
            _isUploading = false;
          });
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: DashboardAppBar(title: 'Nova Transação'),
      drawer: AppDrawer(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                controller: _descricaoController,
                decoration: const InputDecoration(
                  labelText: 'Descrição',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira uma descrição';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _valorController,
                decoration: const InputDecoration(
                  labelText: 'Valor',
                  border: OutlineInputBorder(),
                  prefixText: 'R\$ ',
                ),
                keyboardType: const TextInputType.numberWithOptions(decimal: true),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, insira um valor';
                  }
                  if (double.tryParse(value) == null) {
                    return 'Por favor, insira um valor válido';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _dataController,
                decoration: const InputDecoration(
                  labelText: 'Data',
                  border: OutlineInputBorder(),
                  suffixIcon: Icon(Icons.calendar_today),
                ),
                readOnly: true,
                onTap: _selectDate,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor, selecione uma data';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<TransactionType>(
                value: _transactionTypeController,
                decoration: const InputDecoration(
                  labelText: 'Tipo de Transação',
                  border: OutlineInputBorder(),
                ),
                items: TransactionType.values.map((tipo) {
                  return DropdownMenuItem(
                    value: tipo,
                    child: Text(tipo.descricao),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() {
                    _transactionTypeController = value;
                    _selectedCategoria = null;
                  });
                },
                validator: (value) {
                  if (value == null) {
                    return 'Por favor, selecione um tipo de transação';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<CategoriasType>(
                value: _selectedCategoria,
                decoration: const InputDecoration(
                  labelText: 'Categoria',
                  border: OutlineInputBorder(),
                ),
                items: _handleCategoriaItens(),
                onChanged: (value) {
                  setState(() {
                    _selectedCategoria = value;
                  });
                },
                validator: (value) {
                  if (value == null) {
                    return 'Por favor, selecione uma categoria';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  border: Border.all(color: Theme.of(context).colorScheme.onPrimary),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Anexo (opcional)',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).colorScheme.onPrimary,
                      ),
                    ),
                    const SizedBox(height: 12),
                    if (_selectedFile != null) ...[
                      Row(
                        children: [
                          Icon(
                            Icons.attach_file,
                            color: Theme.of(context).colorScheme.onPrimary,
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              _selectedFile!.name,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          IconButton(
                            icon: Icon(Icons.close, color: Colors.redAccent,),
                            onPressed: _removeFile,
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                    ],
                    ElevatedButton.icon(
                      onPressed: _pickFile,
                      icon: Icon(
                        Icons.upload_file,
                        color: Theme.of(context).colorScheme.onPrimary,
                      ),
                      label: Text(
                        _selectedFile == null ? 'Selecionar Arquivo' : 'Trocar Arquivo',
                        style: TextStyle(
                          color: Theme.of(context).colorScheme.onPrimary,
                        ),
                      ),
                      style: ElevatedButton.styleFrom(
                        minimumSize: const Size(double.infinity, 48),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Formatos aceitos: PDF, JPG, PNG, DOC, DOCX',
                      style: TextStyle(
                          fontSize: 12, color: Theme.of(context).colorScheme.onPrimary),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _isUploading ? null : _submit,
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 48),
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  foregroundColor: Theme.of(context).colorScheme.onPrimary,
                ),
                child: _isUploading
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                        ),
                      )
                    : const Text('Salvar'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  List<DropdownMenuItem<CategoriasType>> _handleCategoriaItens() {
    if (_transactionTypeController == null) {
      return [];
    }

    List<CategoriasType> categorias;

    if (_transactionTypeController == TransactionType.receita) {
      // Para receita, apenas entrada
      categorias = [CategoriasType.entrada];
    } else {
      // Para despesa, todas exceto entrada
      categorias = CategoriasType.values
          .where((categoria) => categoria != CategoriasType.entrada)
          .toList();
    }

    return categorias.map((categoria) {
      return DropdownMenuItem(
        value: categoria,
        child: Text(categoria.descricao),
      );
    }).toList();
  }
}
