import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  imports: [MatToolbar, MatIcon, MatButton, MatIconButton],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private authService = inject(AuthenticationService)

  @Output() loginClick = new EventEmitter<void>();
  @Output() registerClick = new EventEmitter<void>();

  isAuthenticated = computed(() => this.authService.userSignal() !== null);

  logout() {
    this.authService.logout()
  }

}
