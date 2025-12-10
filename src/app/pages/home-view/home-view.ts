import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginModal } from '../../components/login-modal/login-modal';
import { RegisterModal } from '../../components/register-modal/register-modal';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './home-view.html',
  styleUrl: './home-view.css',
})
export class HomeView {
  readonly authModal = inject(MatDialog);

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

  openRegisterModal() {
    this.authModal.open(RegisterModal, {
      id: 'RegisterModal',
      minWidth: '350px',
      maxWidth: '90vw'
    });
  }

  openLoginModal() {
    this.authModal.open(LoginModal, {
      id: 'LoginModal',
      minWidth: '350px',
      maxWidth: '90vw'
    });
  }
}