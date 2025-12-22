import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { FirestoreService } from '../../services/firestore.service';
import { TransactionForm } from '../transaction-form/transaction-form';

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
  transactions: Transaction[] = [];
  loading = true;
  displayedColumns: string[] = ['data', 'descricao', 'categoria', 'tipo', 'valor'];

  totalReceitas = 0;
  totalDespesas = 0;
  saldo = 0;

  constructor(
    private firestoreService: FirestoreService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.loading = true;
    this.cdr.detectChanges();
    this.firestoreService.getCollection('transactions')
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
          console.log('Loading finalizado');
        })
      )
      .subscribe({
        next: (data) => {
          this.transactions = data.sort((a, b) => {
            return new Date(b.data).getTime() - new Date(a.data).getTime();
          });
          this.calculateTotals();
          console.log('Transações carregadas:', this.transactions);
        },
        error: (error) => {
          console.error('Erro ao carregar transações:', error);
        }
      });
  }

  calculateTotals() {
    this.totalReceitas = this.transactions
      .filter(t => t.tipo === 'Receita')
      .reduce((sum, t) => sum + Number(t.valor), 0);

    this.totalDespesas = this.transactions
      .filter(t => t.tipo === 'Despesa')
      .reduce((sum, t) => sum + Number(t.valor), 0);

    this.saldo = this.totalReceitas - this.totalDespesas;
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
