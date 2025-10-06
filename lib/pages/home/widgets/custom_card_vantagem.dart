import 'package:flutter/material.dart';

class CustomCardVantagem extends StatelessWidget {
  final IconData icon;
  final String title;
  final String description;

  const CustomCardVantagem({
    super.key,
    required this.icon,
    required this.title,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, size: 80, color: Theme.of(context).colorScheme.onPrimary),
        Text(
          title,
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 12),
        Text(
          description,
          style: TextStyle(fontSize: 16),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}
