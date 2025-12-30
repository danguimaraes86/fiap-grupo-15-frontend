import { Component, computed, inject, output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [MatToolbar, MatIcon, MatButton, MatIconButton],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private authService = inject(AuthenticationService)
  private router = inject(Router)

  readonly loginClick = output<void>();
  readonly registerClick = output<void>();

  isAuthenticated = computed(() => this.authService.userSignal() !== null);
  isHistoricoRoute = computed(() => this.router.url.includes('/historico'));

  goHistorico() {
    this.router.navigate(['historico'])
  }

  goHome() {
    this.router.navigate(['']);
  }

  logout() {
    this.authService.logout()
  }

}
