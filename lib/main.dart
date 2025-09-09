import 'package:bytebank/pages/home/cadastro_view.dart';
import 'package:bytebank/pages/home/home_view.dart';
import 'package:bytebank/pages/home/login_view.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ByteBank Fiap',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Color.fromARGB(255, 31, 48, 94),
        ),
        useMaterial3: true,
      ),
      home: const MyHomePage(),
      routes: {
        '/login': (context) => const LoginScreen(),
        '/cadastro': (context) => const CadastroScreen(),
      },
    );
  }
}
