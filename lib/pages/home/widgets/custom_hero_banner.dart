import 'package:flutter/material.dart';

class CustomHeroBanner extends StatelessWidget {
  const CustomHeroBanner({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Theme.of(context).colorScheme.onPrimary,
              ),
            ),
            const SizedBox(height: 40),
            Image.asset('assets/images/home_hero.png'),
          ],
        ),
      ),
    );
  }
}
