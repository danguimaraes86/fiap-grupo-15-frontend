class AuthException implements Exception {
  final String message;
  AuthException(this.message);
}

class CadastroException extends AuthException {
  CadastroException(super.message);
}

class LoginException extends AuthException {
  LoginException(super.message);
}