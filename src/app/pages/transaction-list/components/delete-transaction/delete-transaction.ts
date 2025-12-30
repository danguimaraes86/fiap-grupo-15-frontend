import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Transaction } from '../../../../models/transaction.model';

@Component({
  selector: 'app-delete-transaction',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-transaction.html',
  styleUrl: './delete-transaction.css',
})
export class DeleteTransaction {
  data = inject<{ transaction: Transaction }>(MAT_DIALOG_DATA);

  readonly dialogRef = inject(MatDialogRef<DeleteTransaction>);

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}
