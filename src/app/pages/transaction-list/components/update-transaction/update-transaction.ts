import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-update-transaction',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './update-transaction.html',
  styleUrl: './update-transaction.css',
})
export class UpdateTransaction implements OnInit {
  readonly dialogRef = inject(MatDialogRef<UpdateTransaction>);
  private fb = inject(FormBuilder);

  transactionForm!: FormGroup;

  tipos = ['Receita', 'Despesa'];
  categorias = [
    'Alimentação',
    'Transporte',
    'Saúde',
    'Educação',
    'Lazer',
    'Moradia',
    'Vestuário',
    'Outros'
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { transaction: any }) {}

  ngOnInit() {
    this.transactionForm = this.fb.group({
      descricao: [this.data.transaction.descricao, [Validators.required, Validators.minLength(3)]],
      valor: [this.data.transaction.valor, [Validators.required, Validators.min(0.01)]],
      tipo: [this.data.transaction.tipo, Validators.required],
      categoria: [this.data.transaction.categoria, Validators.required],
      data: [new Date(this.data.transaction.data), Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.transactionForm.valid) {
      const updatedTransaction = {
        ...this.data.transaction,
        ...this.transactionForm.value,
        data: this.transactionForm.value.data.toISOString(),
      };
      this.dialogRef.close(updatedTransaction);
    }
  }
}
