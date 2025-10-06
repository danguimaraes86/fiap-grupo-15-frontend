import 'package:bytebank/models/authentication_model.dart';
import 'package:bytebank/models/usuario_model.dart';
import 'package:bytebank/services/auth/authentication_exceptions.dart';
import 'package:bytebank/services/auth/authentication_service.dart';
import 'package:flutter/material.dart';

class UserAuthProvider with ChangeNotifier {
  final AuthenticationService _firebaseService = AuthenticationService();

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  String? _errorMessage;
  String? get errorMessage => _errorMessage;

  Usuario? _usuarioLogado;
  Usuario? get usuarioLogado => _usuarioLogado;

  bool _isLoggedIn = false;
  bool get isLoggedIn => _isLoggedIn;

  Future<bool> handleCadastrarUsuario(CadastroRequest request) async {
    try {
      _setLoading(true);
      _clearError();

      Usuario usuario = await _firebaseService.cadastrarUsuario(request);
      _setLoggedIn(usuario: usuario, loggedIn: true);

      return _isLoggedIn;
    } on CadastroException catch (e) {
      _setError(e.message);
      _setLoggedIn(usuario: null, loggedIn: false);

      return _isLoggedIn;
    } finally {
      _setLoading(false);
    }
  }

  Future<bool> handleLoginUsuario(LoginRequest request) async {
    try {
      _setLoading(true);
      _clearError();

      Usuario usuario = await _firebaseService.loginUsuario(request);
      _setLoggedIn(usuario: usuario, loggedIn: true);

      return _isLoggedIn;
    } on LoginException catch (e) {
      _setError(e.message);
      _setLoggedIn(usuario: null, loggedIn: false);

      return _isLoggedIn;
    } finally {
      _setLoading(false);
    }
  }

  void handleLogoutUsuario() {
    _setLoading(true);
    _clearError();

    _firebaseService.logout();
    _setLoggedIn(usuario: null, loggedIn: false);
    _setLoading(false);
  }

  void _setLoggedIn({Usuario? usuario, required bool loggedIn}) {
    _usuarioLogado = usuario;
    _isLoggedIn = loggedIn;
    notifyListeners();
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  void _setError(String error) {
    _errorMessage = error;
    notifyListeners();
  }

  void _clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}
