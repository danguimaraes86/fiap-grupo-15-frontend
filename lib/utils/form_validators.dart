String? Function(String?) validators(
  List<String? Function(String?)> validators,
) {
  return (String? value) {
    for (final validator in validators) {
      final result = validator(value);
      if (result != null) {
        return result;
      }
    }
    return null;
  };
}

String? validateCampoObrigatorio(String? value, {int minimo = 1}) {
  if (value == null || value.isEmpty) {
    return 'Este campo é obrigatório';
  }
  return null;
}

String? validateTamanhoMinimo(String? value, {int minimo = 1}) {
  if (value!.length < minimo) {
    return 'Este campo deve ter pelo menos $minimo caractere(s).';
  }
  return null;
}

String? validateEmail(String? value) {
  final emailRegex = RegExp(r'^[^@]+@[^@]+\.[^@]+');
  if (!emailRegex.hasMatch(value!)) {
    return 'Digite um e-mail válido';
  }
  return null;
}
