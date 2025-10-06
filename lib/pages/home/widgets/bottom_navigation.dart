import 'package:flutter/material.dart';

import 'custom_auth_buttom.dart';

class BottomNavigationWidget extends StatelessWidget {
  const BottomNavigationWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      minimum: EdgeInsets.symmetric(vertical: 32, horizontal: 16),
      child: Row(
        children: [
          Expanded(
            child: CustomAuthButton(
              backgroundColor: Theme.of(context).colorScheme.onPrimary,
              foregroundColor: Theme.of(context).colorScheme.primary,
              path: '/cadastro',
              icon: Icons.person_add,
              description: 'Cadastrar',
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: CustomAuthButton(
              backgroundColor: Theme.of(context).colorScheme.primary,
              foregroundColor: Theme.of(context).colorScheme.onPrimary,
              path: '/login',
              icon: Icons.login,
              description: 'Entrar',
            ),
          ),
        ],
      ),
    );
  }
}
