import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TransactionService } from '../../services/transaction.service';
import { TransactionModel } from '../../models/transactionModel';

@Component({
  selector: 'app-new-transaction',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './new-transaction.html',
  styleUrl: './new-transaction.css',
})
export class NewTransaction {
  form: FormGroup;
  anexoNome: string = '';
  anexoUrl: string = '';

  tipos = [
    { value: 'entrada', label: 'Entrada' },
    { value: 'saida', label: 'Saída' },
    { value: 'transferencia', label: 'Transferência' },
  ];

  categorias = [
    { value: 'alimentacao', label: 'Alimentação' },
    { value: 'transporte', label: 'Transporte' },
    { value: 'moradia', label: 'Moradia' },
    { value: 'saude', label: 'Saúde' },
    { value: 'educacao', label: 'Educação' },
    { value: 'lazer', label: 'Lazer' },
    { value: 'compras', label: 'Compras' },
    { value: 'investimentos', label: 'Investimentos' },
    { value: 'viagens', label: 'Viagens' },
    { value: 'pagamentos', label: 'Pagamentos' },
    { value: 'salario', label: 'Salário' },
    { value: 'transferencias', label: 'Transferências' },
    { value: 'servicos', label: 'Serviços' },
    { value: 'assinaturas', label: 'Assinaturas' },
    { value: 'impostos', label: 'Impostos' },
  ];

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.form = this.fb.group({
      tipoTransacao: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      categoria: ['', Validators.required],
      descricao: [''], // opcional
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.anexoNome = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.anexoUrl = reader.result as string; // base64
    };

    reader.readAsDataURL(file);
  }

  maskCurrency(event: any) {
    let value = event.target.value;
    value = value.replace(/\D/g, '');

    if (value.length === 0) {
      event.target.value = '0,00';
      this.form.get('valor')?.setValue(0);
      return;
    }

    let numericValue = (parseInt(value, 10) / 100).toFixed(2);
    let formatted = numericValue.replace('.', ',');

    event.target.value = formatted;
    this.form.get('valor')?.setValue(Number(numericValue));
  }

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const now = new Date();

    const transaction = new TransactionModel(
      this.anexoNome,
      this.anexoUrl,
      this.form.value.categoria,
      now,
      this.form.value.descricao || '',
      now.getMonth() + 1,
      this.form.value.tipoTransacao,
      this.form.value.valor
    );

    this.transactionService.addTransaction(transaction);

    console.log('Transações até agora:', this.transactionService.getTransactions());
  }
}
