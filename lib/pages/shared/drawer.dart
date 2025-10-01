// pages/app_drawer.dart

import 'package:bytebank/configs/routes.dart';
import 'package:bytebank/models/app_colors.dart';
import 'package:bytebank/providers/user_auth_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AppDrawer extends StatefulWidget {
  const AppDrawer({super.key});

  @override
  State<AppDrawer> createState() => _AppDrawerState();
}

class _AppDrawerState extends State<AppDrawer> {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.fromLTRB(16, 40, 16, 20),
            decoration: const BoxDecoration(color: AppColors.delftBlue),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Text(
                  'ByteBank Fiap',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                    fontSize: 22,
                  ),
                ),
                const SizedBox(height: 12),
                CircleAvatar(
                  radius: 40,
                  backgroundColor: Colors.white,
                  foregroundColor: AppColors.delftBlue,
                  child: Text(
                    context
                        .read<UserAuthProvider>()
                        .usuarioLogado!
                        .nome
                        .substring(0, 1)
                        .toUpperCase(),
                    style: TextStyle(fontSize: 40, fontWeight: FontWeight.bold),
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  context.read<UserAuthProvider>().usuarioLogado!.nome,
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 18,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  context.read<UserAuthProvider>().usuarioLogado!.email,
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.8),
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),

          ListTile(
            leading: const Icon(Icons.dashboard),
            title: const Text('Dashboard'),
            onTap: () {
              Navigator.pop(context);
              // Navega para a lista (substituindo a tela atual)
              Navigator.pushReplacementNamed(context, Routes.dashboard);
            },
          ),
          ListTile(
            leading: const Icon(Icons.list_alt),
            title: const Text('Histórico de Transações'),
            onTap: () {
              Navigator.pop(context);
              // Navega para a lista (substituindo a tela atual)
              Navigator.pushReplacementNamed(context, Routes.transactionList);
            },
          ),
          ListTile(
            leading: const Icon(Icons.add_circle_outline),
            title: const Text('Nova Transação'),
            onTap: () {
              Navigator.pop(context); // Fecha o menu
              // Navega para o formulário (substituindo a tela atual)
              Navigator.pushReplacementNamed(context, Routes.transactionForm);
            },
          ),
          const Divider(),
          ListTile(
            leading: const Icon(Icons.logout, color: Colors.red),
            title: const Text('Sair', style: TextStyle(color: Colors.red)),
            onTap: () {
              context.read<UserAuthProvider>().handleLogoutUsuario();
              Navigator.pushNamedAndRemoveUntil(
                // Navega para a tela de login e remove todas as outras telas da pilha
                context,
                Routes.home, // Rota de login
                (route) =>
                    false, // Este comando remove todas as telas anteriores
              );
            },
          ),
        ],
      ),
    );
  }
}
