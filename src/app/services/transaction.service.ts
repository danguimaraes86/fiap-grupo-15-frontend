import { Injectable } from '@angular/core';
import { TransactionModel } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactions: TransactionModel[] = [];

  constructor() {}

  addTransaction(transaction: TransactionModel): void {
    this.transactions.push(transaction);
  }

  getTransactions(): TransactionModel[] {
    return [...this.transactions]; // evitar mutação externa
  }

}
