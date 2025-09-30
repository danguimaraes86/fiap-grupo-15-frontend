import 'package:bytebank/configs/routes.dart';
import 'package:bytebank/pages/home/auth/widgets/custom_submit_buttom.dart';
import 'package:bytebank/pages/home/auth/widgets/custom_text_form_field.dart';
import 'package:bytebank/providers/firebase_auth_provider.dart';
import 'package:bytebank/services/firebase_request.dart';
import 'package:bytebank/shared/form_validators.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class LoginView extends StatefulWidget {
  const LoginView({super.key});

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _senhaController = TextEditingController();
  bool _isFormValid = false;

  void _validateAndCheckEnabled() {
    setState(() {
      _isFormValid =
          _emailController.text.isNotEmpty &&
          _senhaController.text.isNotEmpty &&
          (_formKey.currentState?.validate() ?? false);
    });
  }

  void _handleClearFields() {
    _emailController.clear();
    _senhaController.clear();
  }

  Future<void> _handleFormSubmit() async {
    final authProvider = context.read<UserAuthProvider>();

    bool success = await authProvider.handleLoginUsuario(
      LoginRequest(email: _emailController.text, senha: _senhaController.text),
    );

    if (success) {
      _handleClearFields();
      if (mounted) {
        Navigator.pushNamedAndRemoveUntil(
          context,
          Routes.dashboard,
          (route) => false,
        );
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              'Login realizado com sucesso!',
              style: TextStyle(color: Theme.of(context).colorScheme.primary),
            ),
            backgroundColor: Colors.lightGreen,
          ),
        );
      }
    } else {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              authProvider.errorMessage!,
              style: TextStyle(color: Theme.of(context).colorScheme.primary),
            ),
            backgroundColor: Colors.yellowAccent,
            duration: const Duration(seconds: 4),
          ),
        );
      }
    }
  }

  @override
  void dispose() {
    _emailController.dispose();
    _senhaController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Login'),
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
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.login,
                size: 80,
                color: Theme.of(context).colorScheme.onPrimary,
              ),
              const SizedBox(height: 24),
              CustomTextFormField(
                controller: _emailController,
                labelText: 'E-mail',
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
              const SizedBox(height: 24),
              Consumer<UserAuthProvider>(
                builder: (context, provider, child) {
                  return CustomSubmitButton(
                    onPressed: _isFormValid
                        ? (provider.isLoading ? null : _handleFormSubmit)
                        : null,
                    text: 'Entrar',
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
