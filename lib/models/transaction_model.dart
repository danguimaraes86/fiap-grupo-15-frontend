import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class BytebankTransaction {
  String? id;
  String idUsuario;
  String descricao;
  double valor;
  DateTime dataCriacao;
  int mesReferencia;
  TransactionType tipoTransacao;
  String categoria;
  // String? anexoId;

  BytebankTransaction({
    this.id,
    required this.idUsuario,
    required this.descricao,
    required this.valor,
    required this.dataCriacao,
    required this.mesReferencia,
    required this.tipoTransacao,
    required this.categoria,
  });

  Map<String, dynamic> toFirestore() {
    final Map<String, dynamic> data = {
      'idUsuario': idUsuario,
      'descricao': descricao,
      'valor': valor,
      'dataCriacao': dataCriacao,
      'mesReferencia': mesReferencia,
      'tipoTransacao': tipoTransacao.name,
      'categoria': categoria,
    };

    if (id != null) {
      data['id'] = id;
    }

    return data;
  }

  factory BytebankTransaction.fromFirestore(DocumentSnapshot doc) {
    if (!doc.exists || doc.data() == null) {
      throw Exception('Erro ao buscar documento Firestore.');
    }

    Map<String, dynamic> data = doc.data() as Map<String, dynamic>;
    return BytebankTransaction(
      id: doc.id,
      idUsuario: data['idUsuario'],
      descricao: data['descricao'],
      valor: (data['valor']).toDouble(),
      dataCriacao: (data['dataCriacao'] as Timestamp).toDate(),
      mesReferencia: (data['dataCriacao'] as Timestamp).toDate().month,
      tipoTransacao: TransactionType.values.byName(data['tipoTransacao']),
      categoria: CategoriasType.values.byName(data['categoria']).name,
    );
  }
}

/// Tipos de transação
enum TransactionType {
  receita('Entrada'),
  despesa('Saída');

  final String descricao;
  const TransactionType(this.descricao);
}

enum CategoriasType {
  alimentacao('Alimentação', Color(0xFFEF4444)),
  transporte('Transporte', Color(0xFFF59E0B)),
  moradia('Moradia', Color(0xFF8B5CF6)),
  lazer('Lazer', Color(0xFF10B981)),
  saude('Saúde', Color(0xFF3B82F6));

  final String descricao;
  final Color cor;
  const CategoriasType(this.descricao, this.cor);
}
