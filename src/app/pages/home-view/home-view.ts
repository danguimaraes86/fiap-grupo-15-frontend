
import { Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { LoginModal } from '../../components/login-modal/login-modal';
import { RegisterModal } from '../../components/register-modal/register-modal';
import { SnackBar } from '../../components/snack-bar/snack-bar';
import { AuthenticationService } from '../../services/authentication.service';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinner
],
  templateUrl: './home-view.html',
  styleUrl: './home-view.css',
})
export class HomeView implements OnDestroy {

  private _authService = inject(AuthenticationService)
  private _router = inject(Router)

  private _modalRef = inject(MatDialog);
  private _snackBarRef = inject(MatSnackBar)

  private _hasOpenModals = signal(false);
  readonly showLoading = computed(() => {
    return this._authService.isLoading() && !this._hasOpenModals();
  });

  private _effectRef = effect(() => {
    const user = this._authService.userSignal()
    if (user) {
      this._modalRef.getDialogById('RegisterModal')?.close()
      this._modalRef.getDialogById('LoginModal')?.close()
      this._router.navigate(['dashboard'])
    }

    const errorMessage = this._authService.authErrorMessage();
    if (errorMessage) {
      this._snackBarRef.openFromComponent(SnackBar, {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar'],
        data: errorMessage
      })
    }

    this._authService.clearAuthError()
  })

  readonly benefits: Benefit[] = [
    {
      icon: 'credit_card',
      title: 'Conta e cartão gratuitos',
      description: 'Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.'
    },
    {
      icon: 'local_atm',
      title: 'Saques sem custo',
      description: 'Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.'
    },
    {
      icon: 'star',
      title: 'Programa de pontos',
      description: 'Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!'
    },
    {
      icon: 'devices',
      title: 'Seguro Dispositivos',
      description: 'Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.'
    }
  ];

  ngOnDestroy(): void {
    this._effectRef.destroy()
  }

  openRegisterModal() {
    this._hasOpenModals.set(true)
    this._modalRef.open(RegisterModal, {
      id: 'RegisterModal',
      minWidth: '50%',
    }).afterClosed().subscribe(() => {
      this._hasOpenModals.set(false)
    })
  }

  openLoginModal() {
    this._hasOpenModals.set(true)
    this._modalRef.open(LoginModal, {
      id: 'LoginModal',
      minWidth: '50%',
    }).afterClosed().subscribe(() => {
      this._hasOpenModals.set(false)
    })
  }
}