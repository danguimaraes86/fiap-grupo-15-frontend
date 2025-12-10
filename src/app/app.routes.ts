import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home-view/home-view').then(c => c.HomeView),
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
