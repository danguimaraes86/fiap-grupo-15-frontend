import { Component, effect, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FloatingButton } from "../../components/floating-button/floating-button";
import { Graphic } from '../../components/graphic/graphic';
import { NavBar } from "../../components/nav-bar/nav-bar";
import { SummaryCard } from '../../components/summary-card/summary-card';
import { AuthenticationService } from '../../services/authentication.service';
import { FirestoreService } from '../../services/firestore.service';


interface Transaction {
  id: string;
  descricao: string;
  valor: number;
  tipo: string;
  categoria: string;
  data: string;
  criadoEm: string;
}

@Component({
  selector: 'app-dashboard-view',
  imports: [SummaryCard, Graphic, NavBar, FloatingButton],
  templateUrl: './dashboard-view.html',
  styleUrl: './dashboard-view.css',
})
export class DashboardView {
  authService: AuthenticationService;
  private firestoreService: FirestoreService;

  transactions = signal<Transaction[]>([]);
  loading = signal(true);
  totalReceitas = signal(0);
  totalDespesas = signal(0);
  saldo = signal(0);

  constructor(
    authService: AuthenticationService,
    firestoreService: FirestoreService
  ) {
    this.authService = authService;
    this.firestoreService = firestoreService;

    effect(() => {
      const user = this.authService.userSignal();
      const isLoading = this.authService.isLoading();

      if (!isLoading && user) {
        this.loadTransactions();
      }
    });
  }

  loadTransactions() {
    this.loading.set(true);

    const user = this.authService.userSignal();
    if (!user) {
      console.error('Usuário não autenticado');
      this.loading.set(false);
      return;
    }

    this.firestoreService.getCollectionWhere('transactions', 'usuarioId', user.uid)
      .pipe(
        finalize(() => {
          this.loading.set(false);
          console.log('Loading finalizado');
        })
      )
      .subscribe({
        next: (data) => {
          const sortedData = data.sort((a, b) => {
            return new Date(b.data).getTime() - new Date(a.data).getTime();
          });
          this.transactions.set(sortedData);
          this.calculateTotals();
          console.log('Transações carregadas:', this.transactions());
        },
        error: (error) => {
          console.error('Erro ao carregar transações:', error);
        }
      });
  }

  calculateTotals() {
    const data = this.transactions();
    const totalReceitas = data
      .filter(t => t.tipo === 'Receita')
      .reduce((sum, t) => sum + Number(t.valor), 0);

    const totalDespesas = data
      .filter(t => t.tipo === 'Despesa')
      .reduce((sum, t) => sum + Number(t.valor), 0);

    this.totalReceitas.set(totalReceitas);
    this.totalDespesas.set(totalDespesas);
    this.saldo.set(totalReceitas - totalDespesas);
  }

  logout() {
    this.authService.logout()
  }
}

