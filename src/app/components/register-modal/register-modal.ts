import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { AuthenticationService } from '../../services/authentication.service';

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
    ReactiveFormsModule,
    MatProgressSpinner
  ],
  templateUrl: './register-modal.html',
  styleUrl: './register-modal.css',
})
export class RegisterModal {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthenticationService);

  readonly isLoading = this._authService.isLoading;

  hidePassword = true;
  readonly registerForm: FormGroup = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    acceptTerms: [false, Validators.requiredTrue]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Cadastro:', this.registerForm.value);
      this._authService.register(this.registerForm.value)
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
