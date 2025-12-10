import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { LoginModal } from '../../components/login-modal/login-modal';
import { RegisterModal } from '../../components/register-modal/register-modal';

@Component({
  selector: 'app-home-view',
  imports: [MatToolbar, MatCard, MatCardContent, MatIcon, MatButton],
  templateUrl: './home-view.html',
  styleUrl: './home-view.css',
})
export class HomeView {
  readonly authModal = inject(MatDialog)

  openRegisterModal() {
    this.authModal.open(RegisterModal, {
      id: 'RegisterModal',
      minWidth: '50%'
    })
  }
  openLoginModal() {
    this.authModal.open(LoginModal, {
      id: 'LoginModal',
      minWidth: '50%'
    })
  }
}
