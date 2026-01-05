import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
import { ITransaction } from '../../models/transaction.model';
import { AuthenticationService } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';
import { TransactionService } from '../../services/transaction.service';


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
export class TransactionForm {

  private _transactionService = inject(TransactionService)
  private _authService = inject(AuthenticationService);
  private _storageService = inject(StorageService);

  private _snackBar = inject(MatSnackBar);
  private _dialogRef = inject<MatDialogRef<TransactionForm>>(MatDialogRef);

  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  payload = inject<{ transaction: ITransaction } | null>(MAT_DIALOG_DATA);

  transactionForm: FormGroup;

  readonly tipos = ['Receita', 'Despesa'] as const;
  readonly categorias = [
    'Alimentação',
    'Transporte',
    'Saúde',
    'Educação',
    'Lazer',
    'Moradia',
    'Outros',
  ] as const;

  constructor() {
    this.transactionForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      tipo: ['', Validators.required],
      categoria: [''],
      data: [new Date(), Validators.required],
      anexo: [null],
    });

    this.transactionForm.get('tipo')?.valueChanges.subscribe(tipo => {
      this.categoriaRequiredValidator(tipo)
    });

    if (this.payload) {
      this.populateForm();
    }
  }

  private populateForm() {
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
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  async onSubmit() {
    if (!this.transactionForm.valid) {
      this.showValidationError();
      return;
    }

    const user = this._authService.userSignal()!;

    let anexoData = {};
    if (this.selectedFile) {
      const upload = await this._storageService.uploadTransactionImage(user.uid, this.selectedFile);
      anexoData = {
        anexoUrl: upload.url,
        anexoNome: upload.name,
      };
    }

    const { anexo, tipo, categoria, ...formData } = this.transactionForm.value;
    const transactionData: Partial<ITransaction> = {
      ...formData,
      ...anexoData,
      usuarioId: user.uid,
      tipo,
      categoria: tipo == 'Receita' ? 'Entrada' : categoria,
      data: this.transactionForm.value.data.toISOString(),
      criadoEm: new Date().toISOString(),
    };

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

  private async handleNewTransaction(transactionData: Partial<ITransaction>) {
    const transaction = await this._transactionService.addTransaction(transactionData as ITransaction)
    transaction ? this.handleSuccess('cadastrada') : this.handleError('cadastrar')
  }

  private async handleUpdateTransaction(transactionData: Partial<ITransaction>) {
    const success = await this._transactionService.updateTransaction(this.payload!.transaction.id!, transactionData as ITransaction)
    success ? this.handleSuccess('atualizada') : this.handleError('atualizar')
  }

  private handleSuccess(action: string): void {
    this._snackBar.open(
      `Transação ${action} com sucesso!`,
      'Fechar',
      this.getSnackBarConfig('success-snackbar')
    );
    this.clearForm();
    this._dialogRef.close(true);
  }

  private handleError(action: string): void {
    console.error(`Erro ao ${action} transação:`);
    this._snackBar.open(
      `Erro ao ${action} transação. Tente novamente.`,
      'Fechar',
      this.getSnackBarConfig('error-snackbar')
    );
  }

  private showValidationError(): void {
    this._snackBar.open(
      'Por favor, preencha todos os campos obrigatórios.',
      'Fechar',
      this.getSnackBarConfig()
    );
  }

  private categoriaRequiredValidator(tipo: string) {
    const categoriaControl = this.transactionForm.get('categoria');

    if (tipo === 'Despesa') {
      categoriaControl?.setValidators([Validators.required]);
    } else {
      categoriaControl?.clearValidators();
      categoriaControl?.setValue('');
    }

    categoriaControl?.updateValueAndValidity();
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
