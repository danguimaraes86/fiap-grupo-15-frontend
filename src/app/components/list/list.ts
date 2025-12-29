import { Component, OnInit, effect, signal } from '@angular/core';

import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { FirestoreService } from '../../services/firestore.service';
import { AuthenticationService } from '../../services/authentication.service';
import { TransactionForm } from '../transaction-form/transaction-form';
import { Graphic } from '../graphic/graphic';
import { SummaryCard } from '../summary-card/summary-card';

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
  selector: 'app-list',
  standalone: true,
  imports: [
    TransactionForm,
    Graphic,
    SummaryCard,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatTableModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit {
  transactions = signal<Transaction[]>([]);
  loading = signal(true);
  displayedColumns: string[] = ['data', 'descricao', 'categoria', 'tipo', 'valor'];

  totalReceitas = signal(0);
  totalDespesas = signal(0);
  saldo = signal(0);

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthenticationService
  ) {
    effect(() => {
      const user = this.authService.userSignal();
      const isLoading = this.authService.isLoading();
      
      if (!isLoading && user) {
        this.loadTransactions();
      }
    });
  }

  ngOnInit() {
    // O efeito cuidará de carregar as transações quando o usuário estiver autenticado
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}

