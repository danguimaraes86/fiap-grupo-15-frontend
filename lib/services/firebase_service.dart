import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class FirebaseService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  static String usuariosCollection = 'usuarios';

  Future<QuerySnapshot> _findUsuarioByEmail(String email) {
    return _firestore
        .collection(usuariosCollection)
        .where('email', isEqualTo: email)
        .get();
  }

  void _createNewUsuario({
    required String uid,
    required String email,
    required String nome,
  }) {
    _firestore.collection(usuariosCollection).doc(uid).set({
      'nome': nome,
      'email': email,
      'dataCriacao': Timestamp.now(),
      'transacoes': [],
    });
  }

  Future<User> cadastrarUsuario({
    required String nome,
    required String email,
    required String senha,
  }) async {
    try {
      QuerySnapshot userQueryResult = await _findUsuarioByEmail(email);
      if (userQueryResult.docs.isNotEmpty) {
        throw CadastroException('Este email já está cadastrado.');
      }

      await _auth.createUserWithEmailAndPassword(email: email, password: senha);
      await _auth.currentUser?.updateDisplayName(nome);
      _createNewUsuario(uid: _auth.currentUser!.uid, email: email, nome: nome);

      return _auth.currentUser!;
    } on FirebaseAuthException catch (e) {
      String mensagem;
      switch (e.code) {
        case 'weak-password':
          mensagem = 'A senha é muito fraca.';
          break;
        case 'email-already-in-use':
          mensagem = 'Este email já está cadastrado.';
          break;
        case 'invalid-email':
          mensagem = 'Email inválido.';
          break;
        default:
          mensagem = 'Erro de autenticação: ${e.message}';
      }
      throw CadastroException(mensagem);
    }
  }

  Future<User> loginUsuario({
    required String email,
    required String senha,
  }) async {
    try {
      QuerySnapshot userQueryResult = await _findUsuarioByEmail(email);
      if (userQueryResult.docs.isEmpty) {
        throw LoginException('E-mail não localizado.');
      }

      await _auth.signInWithEmailAndPassword(email: email, password: senha);
      return _auth.currentUser!;
    } on FirebaseAuthException catch (e) {
      String mensagem;
      switch (e.code) {
        case 'wrong-password':
          mensagem = 'Senha incorreta.';
          break;
        case 'invalid-credential':
          mensagem = 'Senha incorreta.';
          break;
        case 'user-disabled':
          mensagem = 'Conta desabilitada.';
          break;
        case 'user-not-found':
          mensagem = 'Usuário não encontrado.';
          break;
        case 'invalid-email':
          mensagem = 'Email inválido.';
          break;
        default:
          mensagem = 'Erro de autenticação: ${e.message}';
      }
      throw LoginException(mensagem);
    }
  }
}

class CadastroException implements Exception {
  final String message;

  CadastroException(this.message);
}

class LoginException implements Exception {
  final String message;

  LoginException(this.message);
}
