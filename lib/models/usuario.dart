class Usuario {
  late String _uid;
  late String _nome;
  late String _email;
  int saldo = 0;

  String get uid => _uid;
  String get nome => _nome;
  String get email => _email;

  Usuario({required String uid, required String nome, required String email}) {
    _uid = uid;
    _nome = nome;
    _email = email;
  }

  void updateSaldo(int novoSaldo) {
    saldo = novoSaldo;
  }
}
