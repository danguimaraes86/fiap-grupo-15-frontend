class CadastroException implements Exception {
  final String message;

  CadastroException(this.message);
}

class LoginException implements Exception {
  final String message;

  LoginException(this.message);
}
