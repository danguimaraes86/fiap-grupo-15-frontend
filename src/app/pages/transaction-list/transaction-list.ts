import { Component, OnInit, effect, signal, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { FirestoreService } from '../../services/firestore.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { UpdateTransaction } from './components/update-transaction/update-transaction';
import { DeleteTransaction } from './components/delete-transaction/delete-transaction';

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
  ],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList implements OnInit {
  private _modalRef = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  transactions = signal<Transaction[]>([]);
  loading = signal(true);
  displayedColumns: string[] = ['data', 'descricao', 'categoria', 'tipo', 'valor', 'acoes'];

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
          console.log('Transações carregadas:', this.transactions());
        },
        error: (error) => {
          console.error('Erro ao carregar transações:', error);
        }
      });
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

  openEditDialog(transaction: Transaction): void {
    const dialogRef = this._modalRef.open(UpdateTransaction, {
      width: '500px',
      data: { transaction }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTransaction(result);
      }
    });
  }

  openDeleteDialog(transaction: Transaction): void {
    const dialogRef = this._modalRef.open(DeleteTransaction, {
      width: '400px',
      data: { transaction }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteTransaction(transaction.id);
      }
    });
  }

  updateTransaction(transaction: Transaction): void {
    const { id, ...transactionData } = transaction;
    
    this.firestoreService.updateDocument('transactions', id, transactionData)
      .subscribe({
        next: () => {
          this.snackBar.open('Transação atualizada com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.loadTransactions();
        },
        error: (error) => {
          console.error('Erro ao atualizar transação:', error);
          this.snackBar.open('Erro ao atualizar transação', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      });
  }

  deleteTransaction(id: string): void {
    this.firestoreService.deleteDocument('transactions', id)
      .subscribe({
        next: () => {
          this.snackBar.open('Transação excluída com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.loadTransactions();
        },
        error: (error) => {
          console.error('Erro ao excluir transação:', error);
          this.snackBar.open('Erro ao excluir transação', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      });
  }
}
