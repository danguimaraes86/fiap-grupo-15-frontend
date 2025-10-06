import 'package:flutter/material.dart';

import 'custom_card_vantagem.dart';
import 'custom_hero_banner.dart';

class HomeBodyWidget extends StatelessWidget {
  const HomeBodyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CustomHeroBanner(),
              const SizedBox(height: 40),
              const Text(
                'Vantagens do nosso banco:',
                style: TextStyle(fontSize: 24),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 40),
              CustomCardVantagem(
                icon: Icons.credit_card,
                title: 'Conta e cartão gratuitos',
                description:
                    'Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.',
              ),
              const SizedBox(height: 40),
              CustomCardVantagem(
                icon: Icons.atm,
                title: 'Saques sem custo',
                description:
                    'Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.',
              ),
              const SizedBox(height: 40),
              CustomCardVantagem(
                icon: Icons.star,
                title: 'Programa de pontos',
                description:
                    'Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!',
              ),
              const SizedBox(height: 40),
              CustomCardVantagem(
                icon: Icons.devices,
                title: 'Seguro Dispositivos',
                description:
                    'Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
