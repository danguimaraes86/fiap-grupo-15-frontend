import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
// import { RegisterRequest } from '../../models/request.model'; // <--- COMENTADO: ARQUIVO NÃO ENCONTRADO
// import { AuthenticationService } from '../../services/authentication.service'; // <--- COMENTADO: ARQUIVO NÃO ENCONTRADO

// ----------------------------------------------------------------------------------
// **PLACEHOLDERS:** CLASSES TEMPORÁRIAS PARA EVITAR ERROS DE INJEÇÃO E TIPOS
// ----------------------------------------------------------------------------------
// Crie uma classe vazia temporária para o serviço não encontrado:
class AuthenticationService { }
// Crie uma interface vazia temporária para o modelo não encontrado:
interface RegisterRequest { }
// ----------------------------------------------------------------------------------

@Component({
  selector: 'app-register-modal',
  imports: [
    MatIcon,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatSuffix,
    MatInput,
    MatButton,
    MatIconButton,
    MatCheckbox,
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './register-modal.html',
  styleUrl: './register-modal.css',
})
export class RegisterModal {
  registerForm: FormGroup;
  hidePassword = true;

  // CORREÇÃO DE INJEÇÃO: authService AGORA USA A CLASSE TEMPORÁRIA
  constructor(private fb: FormBuilder, private authService: AuthenticationService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Cadastro:', this.registerForm.value);

      // Comentamos o código que usa o serviço, pois ele está incompleto/ausente
      /*       this.authService.register(this.registerForm.value as RegisterRequest)
        // CORREÇÃO DE TIPO: Adicionamos ': any' para resolver o erro TS7006
        .subscribe((user: any) => console.log(user))
      */
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}