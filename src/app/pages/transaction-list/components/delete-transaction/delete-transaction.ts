import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-transaction',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-transaction.html',
  styleUrl: './delete-transaction.css',
})
export class DeleteTransaction {
  readonly dialogRef = inject(MatDialogRef<DeleteTransaction>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { transaction: any }) {}

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
