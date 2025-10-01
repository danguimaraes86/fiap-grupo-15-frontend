import 'package:bytebank/configs/firebase_options.dart';
import 'package:bytebank/configs/routes.dart';
import 'package:bytebank/configs/system_colors.dart';
import 'package:bytebank/pages/dashboard/dashboard_view.dart';
import 'package:bytebank/pages/home/auth/cadastro_view.dart';
import 'package:bytebank/pages/home/auth/login_view.dart';
import 'package:bytebank/pages/home/home_view.dart';
import 'package:bytebank/pages/transactions/transactions_form.dart';
import 'package:bytebank/pages/transactions/transactions_list.dart';
import 'package:bytebank/providers/firebase_auth_provider.dart';
import 'package:bytebank/providers/transaction_provider.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  await FirebaseAuth.instance.signOut();
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (context) => UserAuthProvider()),
        ChangeNotifierProvider(create: (context) => TransactionProvider()),
      ],
      child: const MyApp(),
    ),
  );
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
      routes: {
        Routes.home: (context) => const HomeView(),
        Routes.login: (context) => const LoginView(),
        Routes.cadastro: (context) => const CadastroView(),
        Routes.dashboard: (context) => const DashboardView(),
        Routes.transactionForm: (context) => const TransactionsFormPage(),
        Routes.transactionList: (context) => const TransactionsListPage(),
      },
    );
  }
}
