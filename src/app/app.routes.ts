import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { sessionUserGuard } from './guards/session-user.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home-view/home-view').then(c => c.HomeView),
    canActivate: [sessionUserGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard-view/dashboard-view').then(c => c.DashboardView),
    canActivate: [authGuard]
  },
  {
    path: 'nova-transacao',
    loadComponent: () => import('./pages/newTransaction/new-transaction').then(m => m.NewTransaction)
  },
    {
    path: 'list',
    loadComponent: () => import('./components/list/list').then(c => c.List),
  },
  {
    path: 'transaction-form',
    loadComponent: () => import('./components/transaction-form/transaction-form').then(c => c.TransactionForm),
  },
];
