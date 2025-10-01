import 'package:bytebank/models/usuario.dart';
import 'package:bytebank/services/firebase_request.dart';
import 'package:bytebank/services/authentication_service.dart';
import 'package:bytebank/services/authentication_service_exceptions.dart';
import 'package:flutter/material.dart';

class UserAuthProvider with ChangeNotifier {
  bool _isLoading = false;
  String? _errorMessage;
  bool _isLoggedIn = false;
  Usuario? _usuarioLogado;

  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isLoggedIn => _isLoggedIn;
  Usuario? get usuarioLogado => _usuarioLogado;

  final AuthenticationService _firebaseService = AuthenticationService();

  Future<bool> handleCadastrarUsuario(CadastroRequest request) async {
    _setLoading(true);
    _clearError();

    try {
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
    _setLoading(true);
    _clearError();

    try {
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
    try {
      _firebaseService.logout();
      _setLoggedIn(usuario: null, loggedIn: false);
    } finally {
      _setLoading(false);
    }
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
