import 'package:bytebank/pages/dashboard/dashboard_view.dart';
import 'package:bytebank/pages/home/auth/cadastro_view.dart';
import 'package:bytebank/pages/home/auth/login_view.dart';
import 'package:bytebank/pages/home/home_view.dart';
import 'package:bytebank/pages/transactions/transactions_form.dart';
import 'package:bytebank/pages/transactions/transactions_list.dart';
import 'package:flutter/material.dart';

class Routes {
  static String home = '/';
  static String cadastro = '/cadastro';
  static String login = '/login';
  static String dashboard = '/dashboard';
  static String transactionList = '/list';
  static String transactionsForm = '/add';

  Map<String, WidgetBuilder> get routes {
    return {
      Routes.home: (context) => const HomeView(),
      Routes.login: (context) => const LoginView(),
      Routes.cadastro: (context) => const CadastroView(),
      Routes.dashboard: (context) => const DashboardView(),
      Routes.transactionsForm: (context) => const TransactionsFormPage(),
      Routes.transactionList: (context) => const TransactionsListPage(),
    };
  }
}
