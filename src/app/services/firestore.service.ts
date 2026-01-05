import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, limit, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { firebaseApp } from '../config/firebase.config';
import { ITransaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private _db = getFirestore(firebaseApp);
  private _transactionsDB = collection(this._db, 'transactions')

  async getAllTransactionsByUserId(usuarioId: string) {
    const querySnapshot = await getDocs(query(
      this._transactionsDB,
      where('usuarioId', '==', usuarioId),
      orderBy('data', 'desc')
    ));
    const transactions: ITransaction[] = [];
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() } as unknown as ITransaction);
    });
    return transactions;
  }

  async getRecentTransactionsByUserId(usuarioId: string, limitCount: number = 5) {
    const querySnapshot = await getDocs(
      query(
        this._transactionsDB,
        where('usuarioId', '==', usuarioId),
        orderBy('data', 'desc'),
        limit(limitCount)
      )
    );
    const transactions: ITransaction[] = [];
    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() } as unknown as ITransaction);
    });
    return transactions;
  }

  async createTransaction(transaction: ITransaction) {
    return await addDoc(this._transactionsDB, transaction)
  }

  async updateTransaction(docId: string, data: any) {
    const docRef = doc(this._transactionsDB, docId);
    return await updateDoc(docRef, data)
  }

  async deleteTransaction(docId: string) {
    const docRef = doc(this._transactionsDB, docId);
    return await deleteDoc(docRef)
  }
}
