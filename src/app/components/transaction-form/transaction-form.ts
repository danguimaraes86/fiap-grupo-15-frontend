import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirestoreService } from '../../services/firestore.service';


@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatSelect,
    MatOption,
    MatError,
    MatDatepickerModule,
    MatNativeDateModule
],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
})
export class TransactionForm {
  @Output() transactionSaved = new EventEmitter<void>();

  transactionForm: FormGroup;

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

  constructor(
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private snackBar: MatSnackBar
  ) {
    this.transactionForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      tipo: ['', Validators.required],
      categoria: ['', Validators.required],
      data: [new Date(), Validators.required]
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const transactionData = {
        ...this.transactionForm.value,
        data: this.transactionForm.value.data.toISOString(),
        criadoEm: new Date().toISOString()
      };

      this.firestoreService.addDocument('transactions', transactionData).subscribe({
        next: (docId) => {
          this.snackBar.open('Transação cadastrada com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.transactionForm.reset();
          this.transactionForm.patchValue({ data: new Date() });
          this.transactionSaved.emit();
          console.log('Documento criado com ID:', docId);
        },
        error: (error) => {
          console.error('Erro ao salvar transação:', error);
          this.snackBar.open('Erro ao cadastrar transação. Tente novamente.', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.transactionForm.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minlength')) {
      return 'Mínimo de 3 caracteres';
    }
    if (field?.hasError('min')) {
      return 'Valor deve ser maior que zero';
    }
    return '';
  }

  clearForm() {
    this.transactionForm.reset();
    this.transactionForm.patchValue({ data: new Date() });
  }
}
