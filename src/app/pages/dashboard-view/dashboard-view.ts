import { Component, effect, inject, OnDestroy } from '@angular/core';
import { FloatingButton } from "../../components/floating-button/floating-button";
import { Graphic } from '../../components/graphic/graphic';
import { NavBar } from "../../components/nav-bar/nav-bar";
import { SideNav } from "../../components/side-nav/side-nav";
import { SummaryCard } from '../../components/summary-card/summary-card';
import { AuthenticationService } from '../../services/authentication.service';
import { TransactionService } from '../../services/transaction.service';


@Component({
  selector: 'app-dashboard-view',
  imports: [SummaryCard, Graphic, NavBar, FloatingButton, SideNav],
  templateUrl: './dashboard-view.html',
  styleUrl: './dashboard-view.css',
})
export class DashboardView implements OnDestroy {
  private _authService = inject(AuthenticationService)
  private _transactionService = inject(TransactionService)

  readonly transactions = this._transactionService.transactionsSignal
  readonly totalReceitas = this._transactionService.receita
  readonly totalDespesas = this._transactionService.despesas
  readonly saldo = this._transactionService.saldo

  private readonly _effectRef = effect(() => {
    const user = this._authService.userSignal();
    const isLoading = this._authService.isLoading();

    if (!isLoading && user) {
      this._transactionService.getAllTransactions(user.uid);
    }
  });

  ngOnDestroy(): void {
    this._effectRef.destroy()
  }

}
