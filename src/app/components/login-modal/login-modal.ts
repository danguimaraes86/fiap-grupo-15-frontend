import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
// import { LoginRequest } from '../../models/request.model'; // <--- COMENTADO: ARQUIVO NÃO ENCONTRADO
// import { AuthenticationService } from '../../services/authentication.service'; // <--- COMENTADO: ARQUIVO NÃO ENCONTRADO
import { FirebaseError } from 'firebase/app';

// ----------------------------------------------------------------------------------
// **PLACEHOLDERS:** CLASSES TEMPORÁRIAS PARA EVITAR ERROS DE INJEÇÃO E TIPOS
// ----------------------------------------------------------------------------------
// Crie uma classe vazia temporária para o serviço não encontrado:
class AuthenticationService { }
// Crie uma interface vazia temporária para o modelo não encontrado:
interface LoginRequest { }
// ----------------------------------------------------------------------------------

@Component({
  selector: 'app-login-modal',
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
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css',
})
export class LoginModal {
  loginForm: FormGroup;
  hidePassword = true;

  // CORREÇÃO DE INJEÇÃO: authService AGORA USA A CLASSE TEMPORÁRIA
  constructor(private fb: FormBuilder, private authService: AuthenticationService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Cadastro:', this.loginForm.value);

      // Comentamos o código que usa o serviço, pois ele está incompleto/ausente
      /*       this.authService.login(this.loginForm.value as LoginRequest)
        // CORREÇÃO DE TIPO: Adicionamos ': any' para resolver o erro TS7006
        .subscribe((user: any) => console.log(user))
      */
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}