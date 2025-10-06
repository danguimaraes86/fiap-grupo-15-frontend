class CadastroRequest {
  final String nome;
  final String email;
  final String senha;

  CadastroRequest({
    required this.nome,
    required this.email,
    required this.senha,
  });

  Map<String, dynamic> toJson() => {
    'nome': nome,
    'email': email,
    'senha': senha,
  };
}

class LoginRequest {
  final String email;
  final String senha;

  LoginRequest({required this.email, required this.senha});

  Map<String, dynamic> toJson() => {'email': email, 'senha': senha};
}
