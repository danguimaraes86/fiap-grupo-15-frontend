import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { FloatingButton } from '../../components/floating-button/floating-button';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { TransactionForm } from '../../components/transaction-form/transaction-form';
import { ITransaction } from '../../models/transaction.model';
import { AuthenticationService } from '../../services/authentication.service';
import { TransactionService } from '../../services/transaction.service';
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
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList implements OnDestroy {
  private destroy$ = new Subject<void>();

  private _modalRef = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  private _authService = inject(AuthenticationService);
  private _transactionService = inject(TransactionService)

  transactions = this._transactionService.transactionsSignal
  loading = signal(true);
  readonly displayedColumns: string[] = [
    'data',
    'descricao',
    'categoria',
    'tipo',
    'valor',
    'acoes',
  ];

  private readonly _effectRef = effect(() => {
    const user = this._authService.userSignal();
    const isAuthLoading = this._authService.isLoading();

    if (!isAuthLoading && user) {
      this.loadTransactions();
    } else if (!isAuthLoading && !user) {
      this.loading.set(false);
    }
  });

  ngOnDestroy(): void {
    this._effectRef.destroy()
  }

  async loadTransactions() {
    try {
      this.loading.set(true);
      await this._transactionService.getAllTransactions(this._authService.userSignal()!.uid)
    } catch (error) {
      this.handleLoadError(error)
    } finally {
      this.loading.set(false);
    }
  }

  downloadAnexo(transaction: ITransaction): void {
    if (!transaction.anexoUrl) {
      this._snackBar.open('Esta transação não possui anexo.', 'Fechar', this.getSnackBarConfig());
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

  private handleLoadError(error: any): void {
    console.error('Erro ao carregar transações:', error);
    this._snackBar.open('Erro ao carregar transações', 'Fechar', this.getSnackBarConfig());
  }

  openEditDialog(transaction: ITransaction): void {
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

  openDeleteDialog(transaction: ITransaction): void {
    const dialogRef = this._modalRef.open(DeleteTransaction, {
      width: '400px',
      data: { transaction },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => result === true),
        switchMap(() => this._transactionService.deleteTransaction(transaction.id)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => this.handleDeleteSuccess(),
        error: (error) => this.handleDeleteError(error),
      });
  }

  private handleDeleteSuccess(): void {
    this._snackBar.open('Transação excluída com sucesso!', 'Fechar', this.getSnackBarConfig());
    this.loadTransactions();
  }

  private handleDeleteError(error: any): void {
    console.error('Erro ao excluir transação:', error);
    this._snackBar.open('Erro ao excluir transação', 'Fechar', this.getSnackBarConfig());
  }

  private getSnackBarConfig() {
    return {
      duration: 3000,
      horizontalPosition: 'end' as const,
      verticalPosition: 'top' as const,
    };
  }
}
