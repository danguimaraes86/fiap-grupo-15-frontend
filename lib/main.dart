import 'package:bytebank/pages/home/cadastro_view.dart';
import 'package:bytebank/configs/firebase_options.dart';
import 'package:bytebank/configs/system_colors.dart';
import 'package:bytebank/pages/home/home_view.dart';
import 'package:bytebank/pages/home/login_view.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ByteBank Fiap',
      theme: ThemeData(
        colorScheme: ColorScheme(
          brightness: Brightness.light,
          primary: SystemColors.primary,
          onPrimary: SystemColors.background,
          secondary: SystemColors.secondary,
          onSecondary: SystemColors.background,
          error: Colors.yellowAccent,
          onError: SystemColors.background,
          surface: SystemColors.secondary,
          onSurface: SystemColors.background,
        ),
      ),
      home: const MyHomePage(),
      routes: {
        '/login': (context) => const LoginScreen(),
        '/cadastro': (context) => const CadastroScreen(),
      },
    );
  }
}
