import 'package:flutter/material.dart';

class CustomAuthButton extends StatelessWidget {
  final Color backgroundColor;
  final Color foregroundColor;
  final String path;
  final IconData icon;
  final String description;

  const CustomAuthButton({
    super.key,
    required this.backgroundColor,
    required this.foregroundColor,
    required this.path,
    required this.icon,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: backgroundColor,
        foregroundColor: foregroundColor,
        padding: EdgeInsets.all(20),
      ),
      onPressed: () => Navigator.pushNamed(context, path),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon),
          const SizedBox(width: 8),
          Text(description)
        ],
      ),
    );
  }
}
