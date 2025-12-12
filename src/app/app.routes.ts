import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'nova-transacao',
    loadComponent: () => import('./pages/newTransaction/new-transaction').then(m => m.NewTransaction)
  }
];
