import 'package:bytebank/configs/firebase_options.dart';
import 'package:bytebank/configs/routes.dart';
import 'package:bytebank/configs/system_colors.dart';
import 'package:bytebank/providers/transaction_provider.dart';
import 'package:bytebank/providers/user_auth_provider.dart';
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
      theme: ThemeData(colorScheme: SystemColors().colorScheme),
      routes: Routes().routes,
    );
  }
}
