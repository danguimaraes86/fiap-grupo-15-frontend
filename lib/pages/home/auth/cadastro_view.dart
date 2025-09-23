import 'package:bytebank/pages/home/auth/widgets/custom_checkbox_field.dart';
import 'package:bytebank/pages/home/auth/widgets/custom_submit_buttom.dart';
import 'package:bytebank/pages/home/auth/widgets/custom_text_form_field.dart';
import 'package:bytebank/services/firebase_service.dart';
import 'package:bytebank/shared/form_validators.dart';
import 'package:flutter/material.dart';

class CadastroView extends StatefulWidget {
  const CadastroView({super.key});

  @override
  State<CadastroView> createState() => _CadastroViewState();
}

class _CadastroViewState extends State<CadastroView> {
  final _formKey = GlobalKey<FormState>();
  final _nomeController = TextEditingController();
  final _emailController = TextEditingController();
  final _senhaController = TextEditingController();
  bool _checkBoxTermoCondicoes = false;
  bool _isLoading = false;
  bool _isFormValid = false;

  void _validateAndCheckEnabled() {
    setState(() {
      _isFormValid =
          _nomeController.text.isNotEmpty &&
          _emailController.text.isNotEmpty &&
          _senhaController.text.isNotEmpty &&
          _checkBoxTermoCondicoes &&
          (_formKey.currentState?.validate() ?? false);
    });
  }

  void _handleClearFields() {
    _nomeController.clear();
    _emailController.clear();
    _senhaController.clear();
    setState(() {
      _checkBoxTermoCondicoes = false;
    });
  }

  Future<void> _handleFormSubmit() async {
    setState(() {
      _isLoading = true;
    });

    try {
      await FirebaseService().cadastrarUsuario(
        nome: _nomeController.text,
        email: _emailController.text,
        senha: _senhaController.text,
      );

      _handleClearFields();

      if (mounted) {
        Navigator.of(context).pop();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              'Cadastro realizado com sucesso!',
              style: TextStyle(color: Theme.of(context).colorScheme.primary),
            ),
            backgroundColor: Colors.lightGreen,
          ),
        );
      }
    } on CadastroException catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              e.message,
              style: TextStyle(color: Theme.of(context).colorScheme.primary),
            ),
            backgroundColor: Colors.yellowAccent,
            duration: const Duration(seconds: 4),
          ),
        );
      }
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  void dispose() {
    _nomeController.dispose();
    _emailController.dispose();
    _senhaController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Cadastro'),
        centerTitle: true,
        backgroundColor: Theme.of(context).colorScheme.primary,
        foregroundColor: Theme.of(context).colorScheme.onPrimary,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Form(
          key: _formKey,
          autovalidateMode: AutovalidateMode.onUnfocus,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Icon(
                Icons.person_add,
                size: 80,
                color: Theme.of(context).colorScheme.onPrimary,
              ),
              const SizedBox(height: 24),
              CustomTextFormField(
                controller: _nomeController,
                labelText: 'Nome',
                prefixIcon: Icons.person,
                validatores: [
                  (v) => validateCampoObrigatorio(v),
                  (v) => validateTamanhoMinimo(v, minimo: 6),
                ],
                onChanged: (_) => _validateAndCheckEnabled(),
              ),

              const SizedBox(height: 16),
              CustomTextFormField(
                controller: _emailController,
                labelText: 'Email',
                prefixIcon: Icons.email,
                keyboardType: TextInputType.emailAddress,
                validatores: [
                  (v) => validateCampoObrigatorio(v),
                  (v) => validateEmail(v),
                ],
                onChanged: (_) => _validateAndCheckEnabled(),
              ),
              const SizedBox(height: 16),
              CustomTextFormField(
                controller: _senhaController,
                labelText: 'Senha',
                prefixIcon: Icons.lock,
                obscureText: true,
                validatores: [
                  (v) => validateCampoObrigatorio(v),
                  (v) => validateTamanhoMinimo(v, minimo: 6),
                ],
                onChanged: (_) => _validateAndCheckEnabled(),
              ),
              const SizedBox(height: 16),
              CustomCheckboxField(
                value: _checkBoxTermoCondicoes,
                onChanged: (bool? value) {
                  setState(() {
                    _checkBoxTermoCondicoes = value!;
                  });
                  _validateAndCheckEnabled();
                },
              ),
              const SizedBox(height: 40),
              CustomSubmitButton(
                onPressed: _isFormValid
                    ? (_isLoading ? null : _handleFormSubmit)
                    : null,
                text: 'Cadastrar',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
