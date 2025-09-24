class CadastroRequest {
  final String nome;
  final String email;
  final String senha;

  CadastroRequest({
    required this.nome,
    required this.email,
    required this.senha,
  });
}

class LoginRequest {
  final String email;
  final String senha;

  LoginRequest({required this.email, required this.senha});
}
