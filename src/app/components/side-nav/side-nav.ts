import { Component, inject, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-side-nav',
  imports: [MatSidenavModule, MatIcon, MatListModule, RouterLink],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css',
})
export class SideNav {
  authService = inject(AuthenticationService)

  @ViewChild('drawer') drawer!: MatSidenav;

  toggle() {
    this.drawer.toggle();
  }

}
