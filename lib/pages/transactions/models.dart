import 'package:flutter/material.dart';

/// Paleta que você passou
class AppColors {
  static const delftBlue  = Color(0xFF1F305E);
  static const paynesGray = Color(0xFF556284);
  static const coolGray   = Color(0xFF8A93AA);
  static const frenchGray = Color(0xFFC0C4D0);
  static const whiteSmoke = Color(0xFFF5F5F5);
}

/// Tipos de transação
enum TxType { income, expense, transfer }

String txTypeLabel(TxType t) => switch (t) {
  TxType.income   => 'Entrada',
  TxType.expense  => 'Saída',
  TxType.transfer => 'Transf.',
};

Color txTypeBg(TxType t) => switch (t) {
  TxType.income   => const Color(0xFFE7F4EA),
  TxType.expense  => const Color(0xFFFCE8E8),
  TxType.transfer => const Color(0xFFEFF2F7),
};

Color txTypeFg(TxType t) => switch (t) {
  TxType.income   => const Color(0xFF2E7D32),
  TxType.expense  => const Color(0xFFC62828),
  TxType.transfer => AppColors.paynesGray,
};
