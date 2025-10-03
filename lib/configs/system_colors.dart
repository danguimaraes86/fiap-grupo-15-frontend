import 'package:flutter/material.dart';

class SystemColors {
  static Color primary = Color.fromARGB(255, 31, 48, 94);
  static Color secondary = Color.fromARGB(255, 85, 98, 132);
  static Color background = Color.fromARGB(255, 245, 245, 245);

  ColorScheme get colorScheme {
    return ColorScheme(
      brightness: Brightness.light,
      primary: SystemColors.primary,
      onPrimary: SystemColors.background,
      secondary: SystemColors.secondary,
      onSecondary: SystemColors.background,
      error: Colors.yellowAccent,
      onError: SystemColors.background,
      surface: SystemColors.secondary,
      onSurface: SystemColors.background,
    );
  }
}
