import { Component, inject } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { TransactionForm } from '../transaction-form/transaction-form';

@Component({
  selector: 'app-floating-button',
  imports: [MatIcon, MatFabButton],
  templateUrl: './floating-button.html',
  styleUrl: './floating-button.css',
})
export class FloatingButton {
  private _modalRef = inject(MatDialog);

  openTransactionForm() {
    this._modalRef.open(TransactionForm, {
      id: 'TransactionForm',
      minWidth: '50%',
    })
  }
}
