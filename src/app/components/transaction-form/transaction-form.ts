import { Component, inject, OnDestroy, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { Transaction } from '../../models/transaction.model';
import { AuthenticationService } from '../../services/authentication.service';
import { FirestoreService } from '../../services/firestore.service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatPrefix,
    MatSelect,
    MatOption,
    MatError,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
})
export class TransactionForm implements OnDestroy {
  private fb = inject(FormBuilder);
  private firestoreService = inject(FirestoreService);
  private authService = inject(AuthenticationService);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject<MatDialogRef<TransactionForm>>(MatDialogRef);

  readonly transactionSaved = output<void>();
  payload = inject<{ transaction: Transaction } | null>(MAT_DIALOG_DATA);

  transactionForm: FormGroup;

  readonly tipos = ['Receita', 'Despesa'] as const;
  readonly categorias = [
    'Alimentação',
    'Transporte',
    'Saúde',
    'Educação',
    'Lazer',
    'Moradia',
    'Vestuário',
    'Outros',
  ] as const;

  private destroy$ = new Subject<void>();
  private storageService = inject(StorageService);

  constructor() {
    this.transactionForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      tipo: ['', Validators.required],
      categoria: ['', Validators.required],
      data: [new Date(), Validators.required],
      anexo: [null],
    });

    if (this.payload) {
      this.populateForm();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  populateForm() {
    this.transactionForm.patchValue({
      descricao: this.payload?.transaction.descricao,
      valor: this.payload?.transaction.valor,
      tipo: this.payload?.transaction.tipo,
      categoria: this.payload?.transaction.categoria,
      data: this.payload?.transaction.data ? new Date(this.payload?.transaction.data) : new Date(),
    });
    if (this.payload?.transaction.anexoUrl) {
      this.imagePreview = this.payload.transaction.anexoUrl;
      this.selectedFileName = this.payload.transaction.anexoNome ?? null;
    }
  }

  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  imagePreview: string | null = null;

  onFileSelected(event: Event, fileInput: HTMLInputElement) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    this.selectedFile = file;
    this.selectedFileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }

  private showValidationError(): void {
    this.snackBar.open(
      'Por favor, preencha todos os campos obrigatórios.',
      'Fechar',
      this.getSnackBarConfig()
    );
  }

  async onSubmit() {
    if (!this.transactionForm.valid) {
      this.showValidationError();
      return;
    }

    const user = this.authService.userSignal()!;

    let anexoData = {};

    if (this.selectedFile) {
      const upload = await this.storageService.uploadTransactionImage(user.uid, this.selectedFile);

      anexoData = {
        anexoUrl: upload.url,
        anexoNome: upload.name,
      };
    }

    const transactionData: Partial<Transaction> = {
      ...this.transactionForm.value,
      ...anexoData,
      usuarioId: user.uid,
      data: this.transactionForm.value.data.toISOString(),
      criadoEm: new Date().toISOString(),
    };

    delete (transactionData as any).anexo;

    this.payload
      ? this.handleUpdateTransaction(transactionData)
      : this.handleNewTransaction(transactionData);
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

  private handleNewTransaction(transactionData: Partial<Transaction>): void {
    this.firestoreService
      .addDocument('transactions', transactionData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.handleSuccess('cadastrada'),
        error: (error) => this.handleError('cadastrar', error),
      });
  }

  private handleUpdateTransaction(transactionData: Partial<Transaction>): void {
    this.firestoreService
      .updateDocument('transactions', this.payload!.transaction.id!, transactionData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.handleSuccess('atualizada'),
        error: (error) => this.handleError('atualizar', error),
      });
  }

  private handleSuccess(action: string): void {
    this.snackBar.open(
      `Transação ${action} com sucesso!`,
      'Fechar',
      this.getSnackBarConfig('success-snackbar')
    );
    this.clearForm();
    this.transactionSaved.emit();
    this.dialogRef.close(true);
  }

  private handleError(action: string, error: any): void {
    console.error(`Erro ao ${action} transação:`, error);
    this.snackBar.open(
      `Erro ao ${action} transação. Tente novamente.`,
      'Fechar',
      this.getSnackBarConfig('error-snackbar')
    );
  }

  private getSnackBarConfig(panelClass?: string) {
    return {
      duration: 3000,
      horizontalPosition: 'end' as const,
      verticalPosition: 'top' as const,
      ...(panelClass && { panelClass: [panelClass] }),
    };
  }
}
