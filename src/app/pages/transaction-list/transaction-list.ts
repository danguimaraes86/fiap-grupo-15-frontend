import { Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Subject } from 'rxjs';
import { filter, finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import { FloatingButton } from '../../components/floating-button/floating-button';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { TransactionForm } from '../../components/transaction-form/transaction-form';
import { Transaction } from '../../models/transaction.model';
import { AuthenticationService } from '../../services/authentication.service';
import { FirestoreService } from '../../services/firestore.service';
import { DeleteTransaction } from './components/delete-transaction/delete-transaction';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    NavBar,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatTableModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    FloatingButton,
  ],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList implements OnDestroy {
  private destroy$ = new Subject<void>();

  private _modalRef = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private firestoreService = inject(FirestoreService);
  private authService = inject(AuthenticationService);

  transactions = signal<Transaction[]>([]);
  loading = signal(true);
  readonly displayedColumns: string[] = [
    'data',
    'descricao',
    'categoria',
    'tipo',
    'valor',
    'acoes',
  ];

  hasTransactions = computed(() => this.transactions().length > 0);
  isEmpty = computed(() => !this.loading() && this.transactions().length === 0);

  constructor() {
    effect(() => {
      const user = this.authService.userSignal();
      const isLoading = this.authService.isLoading();

      if (!isLoading && user) {
        this.loadTransactions();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTransactions() {
    this.loading.set(true);
    const user = this.authService.userSignal()!;
    this.firestoreService
      .getCollectionWhere('transactions', 'usuarioId', user.uid)
      .pipe(
        map((data) => this.sortTransactionsByDate(data)),
        finalize(() => this.loading.set(false)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => this.transactions.set(data),
        error: (error) => this.handleLoadError(error),
      });
  }

  downloadAnexo(transaction: Transaction): void {
    if (!transaction.anexoUrl) {
      this.snackBar.open('Esta transação não possui anexo.', 'Fechar', this.getSnackBarConfig());
      return;
    }

    const link = document.createElement('a');
    link.href = transaction.anexoUrl;
    link.download = transaction.anexoNome || 'anexo';
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private sortTransactionsByDate(transactions: Transaction[]): Transaction[] {
    return [...transactions].sort(
      (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
    );
  }

  private handleLoadError(error: any): void {
    console.error('Erro ao carregar transações:', error);
    this.snackBar.open('Erro ao carregar transações', 'Fechar', this.getSnackBarConfig());
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  openEditDialog(transaction: Transaction): void {
    const dialogRef = this._modalRef.open(TransactionForm, {
      width: '500px',
      data: { transaction },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.loadTransactions();
        }
      });
  }

  openDeleteDialog(transaction: Transaction): void {
    const dialogRef = this._modalRef.open(DeleteTransaction, {
      width: '400px',
      data: { transaction },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => result === true),
        switchMap(() => this.firestoreService.deleteDocument('transactions', transaction.id)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => this.handleDeleteSuccess(),
        error: (error) => this.handleDeleteError(error),
      });
  }

  private handleDeleteSuccess(): void {
    this.snackBar.open('Transação excluída com sucesso!', 'Fechar', this.getSnackBarConfig());
    this.loadTransactions();
  }

  private handleDeleteError(error: any): void {
    console.error('Erro ao excluir transação:', error);
    this.snackBar.open('Erro ao excluir transação', 'Fechar', this.getSnackBarConfig());
  }

  private getSnackBarConfig() {
    return {
      duration: 3000,
      horizontalPosition: 'end' as const,
      verticalPosition: 'top' as const,
    };
  }
}
