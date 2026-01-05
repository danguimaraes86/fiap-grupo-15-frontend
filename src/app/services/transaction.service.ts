import { computed, inject, Injectable, signal } from '@angular/core';
import { ITransaction } from '../models/transaction.model';
import { AuthenticationService } from './authentication.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private _firestoreService = inject(FirestoreService)
  private _authService = inject(AuthenticationService)

  private _transactions = signal<ITransaction[]>([]);
  readonly transactionsSignal = this._transactions.asReadonly();

  receita = signal<number>(0)
  despesas = signal<number>(0)
  saldo = computed(() => this.receita() - this.despesas())

  async getAllTransactions(userId: string) {
    const transactions = await this._firestoreService.getAllTransactionsByUserId(userId)
    this._transactions.set(transactions)
    this.calculateTotals(transactions)
  }

  async addTransaction(transaction: ITransaction) {
    try {
      const success = await this._firestoreService.createTransaction(transaction);
      if (success) {
        await this.getAllTransactions(this._authService.userSignal()!.uid);
      }
      return success;
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      return false;
    }
  }

  async updateTransaction(transactionId: string, transaction: ITransaction) {
    try {
      await this._firestoreService.updateTransaction(transactionId, transaction);
      await this.getAllTransactions(this._authService.userSignal()!.uid);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      return false;
    }
  }

  async deleteTransaction(transactionId: string) {
    try {
      await this._firestoreService.deleteTransaction(transactionId);
      await this.getAllTransactions(this._authService.userSignal()!.uid);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      return false;
    }
  }

  private calculateTotals(transactions: ITransaction[]) {
    this.receita.set(transactions
      .filter(t => t.tipo === 'Receita')
      .reduce((sum, t) => sum + Number(t.valor), 0))

    this.despesas.set(transactions
      .filter(t => t.tipo === 'Despesa')
      .reduce((sum, t) => sum + Number(t.valor), 0))
  }

}
