import 'dart:io';
import 'package:bytebank/models/transaction_model.dart';
import 'package:bytebank/models/usuario_model.dart';
import 'package:bytebank/pages/shared/custom_text_form_field.dart';
import 'package:bytebank/providers/transaction_provider.dart';
import 'package:bytebank/providers/user_auth_provider.dart';
import 'package:bytebank/services/storage/storage_service.dart';
import 'package:bytebank/utils/form_validators.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class TransactionEditModal extends StatefulWidget {
  final BytebankTransaction transaction;

  const TransactionEditModal({super.key, required this.transaction});

  @override
  State<TransactionEditModal> createState() => _TransactionEditModalState();
}

class _TransactionEditModalState extends State<TransactionEditModal> {
  final _form = GlobalKey<FormState>();
  late final TextEditingController _descricaoController;
  late final TextEditingController _valorController;
  late DateTime _dataCriacaoController;
  late TransactionType _transactionTypeController;
  late CategoriasType _categoriasTypeController;

  final StorageService _storageService = StorageService();
  PlatformFile? _selectedFile;
  bool _isUploading = false;
  String? _existingFileUrl;
  String? _existingFileName;

  @override
  void initState() {
    super.initState();
    _loadTransaction();
  }

  void _loadTransaction() {
    final transaction = widget.transaction;
    _descricaoController = TextEditingController(text: transaction.descricao);
    _valorController = TextEditingController(
      text: transaction.valor.toString().replaceAll('.', ','),
    );
    _dataCriacaoController = transaction.dataCriacao;
    _transactionTypeController = transaction.tipoTransacao;
    _categoriasTypeController = CategoriasType.values.byName(transaction.categoria);
    _existingFileUrl = transaction.anexoUrl;
    _existingFileName = transaction.anexoNome;
  }

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

  Future<void> _pickFile() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
        allowMultiple: false,
      );

      if (result != null) {
        setState(() {
          _selectedFile = result.files.first;
        });
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao selecionar arquivo: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  void _removeFile() {
    setState(() {
      _selectedFile = null;
      _existingFileUrl = null;
      _existingFileName = null;
    });
  }

  Future<void> _submit() async {
    if (!_form.currentState!.validate()) return;

    setState(() => _isUploading = true);

    try {
      Usuario usuario = context.read<UserAuthProvider>().usuarioLogado!;

      String? fileUrl = _existingFileUrl;
      String? fileName = _existingFileName;

      // Upload do novo arquivo se foi selecionado
      if (_selectedFile != null) {
        // Deletar arquivo anterior se existir
        if (_existingFileUrl != null) {
          try {
            await _storageService.deleteFile(_existingFileUrl!);
          } catch (e) {
            // Ignora erro ao deletar arquivo antigo
          }
        }

        // Upload do novo arquivo
        if (kIsWeb) {
          fileUrl = await _storageService.uploadFile(
            userId: usuario.uid,
            transactionId: widget.transaction.id!,
            file: _selectedFile!.bytes,
            fileName: _selectedFile!.name,
          );
        } else {
          fileUrl = await _storageService.uploadFile(
            userId: usuario.uid,
            transactionId: widget.transaction.id!,
            file: File(_selectedFile!.path!),
            fileName: _selectedFile!.name,
          );
        }
        fileName = _selectedFile!.name;
      }

      final transaction = BytebankTransaction(
        id: widget.transaction.id,
        idUsuario: usuario.uid,
        descricao: _descricaoController.text,
        valor: double.parse(_valorController.text.replaceAll(',', '.')),
        tipoTransacao: _transactionTypeController,
        dataCriacao: _dataCriacaoController,
        mesReferencia: _dataCriacaoController.month,
        categoria: _transactionTypeController.name == 'receita'
            ? CategoriasType.entrada.name
            : _categoriasTypeController.name,
        anexoUrl: fileUrl,
        anexoNome: fileName,
      );

      await context.read<TransactionProvider>().handleUpdateTransaction(transaction);

      if (mounted) {
        Navigator.pop(context, true); // Retorna true indicando sucesso
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              'Transação atualizada com sucesso!',
              style: TextStyle(color: Theme.of(context).colorScheme.primary),
            ),
            backgroundColor: Colors.lightGreen,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao atualizar transação: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isUploading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Container(
        constraints: const BoxConstraints(maxWidth: 600, maxHeight: 700),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Cabeçalho do Modal
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.primary,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(16),
                  topRight: Radius.circular(16),
                ),
              ),
              child: Row(
                children: [
                  Icon(
                    Icons.edit,
                    color: Theme.of(context).colorScheme.onPrimary,
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      'Editar Transação',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Theme.of(context).colorScheme.onPrimary,
                      ),
                    ),
                  ),
                  IconButton(
                    icon: Icon(
                      Icons.close,
                      color: Theme.of(context).colorScheme.onPrimary,
                    ),
                    onPressed: () => Navigator.pop(context),
                  ),
                ],
              ),
            ),

            // Conteúdo do Modal
            Expanded(
              child: SingleChildScrollView(
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
                        keyboardType: const TextInputType.numberWithOptions(decimal: true),
                        validatores: [(v) => validateCampoObrigatorio(v)],
                        inputFormatter: [
                          FilteringTextInputFormatter.allow(RegExp(r'^\d*[.,]?\d*')),
                        ],
                      ),

                      const SizedBox(height: 12),
                      DropdownButtonFormField<TransactionType>(
                        value: _transactionTypeController,
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
                        onChanged: (v) {
                          if (v != null) {
                            setState(() {
                              _transactionTypeController = v;
                              // Resetar categoria para primeira opção válida do novo tipo
                              if (v == TransactionType.receita) {
                                _categoriasTypeController = CategoriasType.entrada;
                              } else {
                                // Para despesa, pegar primeira categoria que não é entrada
                                _categoriasTypeController = CategoriasType.values
                                    .firstWhere((cat) => cat != CategoriasType.entrada);
                              }
                            });
                          }
                        },
                      ),

                      const SizedBox(height: 12),
                      DropdownButtonFormField<CategoriasType>(
                        value: _getValidCategoria(),
                        decoration: const InputDecoration(
                          labelText: 'Categoria',
                          border: OutlineInputBorder(),
                        ),
                        items: _handleCategoriaItens(),
                        onChanged: (v) {
                          if (v != null) {
                            setState(() {
                              _categoriasTypeController = v;
                            });
                          }
                        },
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
                                color: Theme.of(context).colorScheme.primary,
                              ),
                            ],
                          ),
                        ),
                      ),

                      const SizedBox(height: 20),
                      // Seção de Upload de Arquivo
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          border: Border.all(color: Colors.grey.shade300),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Icon(
                                  Icons.attach_file,
                                  color: Theme.of(context).colorScheme.primary,
                                  size: 20,
                                ),
                                const SizedBox(width: 8),
                                Text(
                                  'Anexo (Opcional)',
                                  style: TextStyle(
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold,
                                    color: Theme.of(context).colorScheme.primary,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),
                            if (_selectedFile != null || _existingFileName != null)
                              Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  color: Colors.grey.shade100,
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Row(
                                  children: [
                                    Icon(
                                      Icons.insert_drive_file,
                                      color: Theme.of(context).colorScheme.primary,
                                      size: 20,
                                    ),
                                    const SizedBox(width: 8),
                                    Expanded(
                                      child: Text(
                                        _selectedFile?.name ?? _existingFileName ?? '',
                                        overflow: TextOverflow.ellipsis,
                                        style: const TextStyle(fontSize: 13),
                                      ),
                                    ),
                                    IconButton(
                                      icon: const Icon(Icons.close, color: Colors.red, size: 20),
                                      onPressed: _removeFile,
                                      padding: EdgeInsets.zero,
                                      constraints: const BoxConstraints(),
                                    ),
                                  ],
                                ),
                              )
                            else
                              OutlinedButton.icon(
                                onPressed: _pickFile,
                                icon: const Icon(Icons.upload_file, size: 18),
                                label: const Text('Selecionar Arquivo', style: TextStyle(fontSize: 13)),
                                style: OutlinedButton.styleFrom(
                                  minimumSize: const Size(double.infinity, 45),
                                ),
                              ),
                            const SizedBox(height: 8),
                            Text(
                              'Formatos: PDF, JPG, PNG, DOC, DOCX',
                              style: TextStyle(
                                fontSize: 11,
                                color: Colors.grey.shade600,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // Botões de Ação
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                border: Border(top: BorderSide(color: Colors.grey.shade300)),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: _isUploading ? null : () => Navigator.pop(context),
                      child: const Text('Cancelar'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Theme.of(context).colorScheme.primary,
                        foregroundColor: Theme.of(context).colorScheme.onPrimary,
                      ),
                      onPressed: _isUploading ? null : _submit,
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
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  CategoriasType _getValidCategoria() {
    // Se for receita, deve ser entrada
    if (_transactionTypeController == TransactionType.receita) {
      return CategoriasType.entrada;
    }
    
    // Se for despesa, não pode ser entrada
    if (_categoriasTypeController == CategoriasType.entrada) {
      return CategoriasType.values.firstWhere((cat) => cat != CategoriasType.entrada);
    }
    
    return _categoriasTypeController;
  }

  List<DropdownMenuItem<CategoriasType>> _handleCategoriaItens() {
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
