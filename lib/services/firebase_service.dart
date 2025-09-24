import 'package:bytebank/models/usuario.dart';
import 'package:bytebank/services/firebase_request.dart';
import 'package:bytebank/services/firebase_service_exceptions.dart';
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

  void _createNewUsuario(Usuario usuario) {
    _firestore.collection(usuariosCollection).doc(usuario.uid).set({
      'nome': usuario.nome,
      'email': usuario.email,
      'dataCriacao': Timestamp.now(),
    });
  }

  Future<Usuario> cadastrarUsuario(CadastroRequest request) async {
    try {
      QuerySnapshot userQueryResult = await _findUsuarioByEmail(request.email);
      if (userQueryResult.docs.isNotEmpty) {
        throw CadastroException('Este email já está cadastrado.');
      }

      await _auth.createUserWithEmailAndPassword(
        email: request.email,
        password: request.senha,
      );
      await _auth.currentUser?.updateDisplayName(request.nome);

      Usuario novoUsuario = Usuario(
        uid: _auth.currentUser!.uid,
        nome: request.nome,
        email: request.email,
      );
      _createNewUsuario(novoUsuario);

      return novoUsuario;
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

  Future<Usuario> loginUsuario(LoginRequest request) async {
    try {
      QuerySnapshot userQueryResult = await _findUsuarioByEmail(request.email);
      if (userQueryResult.docs.isEmpty) {
        throw LoginException('Email não localizado.');
      }

      await _auth.signInWithEmailAndPassword(
        email: request.email,
        password: request.senha,
      );

      return Usuario(
        uid: _auth.currentUser!.uid,
        nome: _auth.currentUser!.displayName ?? 'Nome do usuário',
        email: _auth.currentUser!.email ?? 'Email do usuário',
      );
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
