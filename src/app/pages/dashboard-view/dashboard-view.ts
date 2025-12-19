import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard-view',
  imports: [],
  templateUrl: './dashboard-view.html',
  styleUrl: './dashboard-view.css',
})
export class DashboardView {
  readonly authService = inject(AuthenticationService)

  logout() {
    this.authService.logout()
  }

}
