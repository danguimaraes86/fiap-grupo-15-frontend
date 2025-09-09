import 'package:flutter/material.dart';

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final String _title = 'ByteBank Fiap';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.primary,
        title: Text(
          _title,
          style: TextStyle(
            color: Theme.of(context).colorScheme.onPrimary,
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: const Center(
          child: Padding(
            padding: EdgeInsets.all(24.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.account_balance,
                  size: 80,
                  color: Color.fromARGB(255, 31, 48, 94),
                ),
                SizedBox(height: 24),
                Text(
                  'Bem-vindo ao ByteBank Fiap!',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 16),
                Text(
                  'Gerencie suas finanças de forma simples e segura.',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 16, color: Colors.grey),
                ),
              ],
            ),
          ),
        ),
      ),
      bottomNavigationBar: SafeArea(
        minimum: EdgeInsets.symmetric(vertical: 32, horizontal: 16),
        child: Row(
          children: [
            Expanded(
              child: ElevatedButton(
                onPressed: () => Navigator.pushNamed(context, '/cadastro'),
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.person_add),
                    SizedBox(width: 8),
                    Text('Cadastrar'),
                  ],
                ),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  foregroundColor: Theme.of(context).colorScheme.onPrimary,
                ),
                onPressed: () => Navigator.pushNamed(context, '/login'),
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.login),
                    SizedBox(width: 8),
                    Text('Entrar'),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
