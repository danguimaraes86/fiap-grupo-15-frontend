import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardHeader, MatCardTitle, CurrencyPipe],
  templateUrl: './summary-card.html',
  styleUrl: './summary-card.css',
})
export class SummaryCard {
  readonly totalReceitas = input(0);
  readonly totalDespesas = input(0);
  readonly saldo = input(0);
}
