import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { AuthenticationService } from '../../services/authentication.service';

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
    ReactiveFormsModule,
    MatProgressSpinner
  ],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css',
})
export class LoginModal {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthenticationService);

  isLoading = this._authService.isLoading;

  hidePassword = true;
  readonly loginForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value)
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}