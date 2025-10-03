import 'package:bytebank/utils/form_validators.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class CustomTextFormField extends StatelessWidget {
  final TextEditingController controller;
  final String labelText;
  final IconData? prefixIcon;
  final bool obscureText;
  final TextInputType? keyboardType;
  final List<String? Function(String?)>? validatores;
  final void Function(String)? onChanged;
  final List<TextInputFormatter>? inputFormatter;

  const CustomTextFormField({
    super.key,
    required this.controller,
    required this.labelText,
    this.prefixIcon,
    this.obscureText = false,
    this.keyboardType,
    this.validatores,
    this.onChanged,
    this.inputFormatter,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        labelText: labelText,
        floatingLabelStyle: TextStyle(color: Theme.of(context).colorScheme.onPrimary),
        border: const OutlineInputBorder(),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Theme.of(context).colorScheme.onPrimary),
        ),
        prefixIcon: prefixIcon != null ? Icon(prefixIcon) : null,
      ),
      cursorColor: Theme.of(context).colorScheme.onPrimary,
      obscureText: obscureText,
      keyboardType: keyboardType,
      validator: validators(validatores ?? []),
      autocorrect: false,
      inputFormatters: inputFormatter,
      onChanged: onChanged,
    );
  }
}
