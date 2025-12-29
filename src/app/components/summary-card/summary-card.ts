import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardHeader, MatCardTitle],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.css',
})
export class SummaryCard {
  @Input() totalReceitas = 0;
  @Input() totalDespesas = 0;
  @Input() saldo = 0;

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
}
