import { Routes } from '@angular/router';
import { sessionUserGuard } from './guards/session-user.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home-view/home-view').then(c => c.HomeView),
    canActivate: [sessionUserGuard]
  },
];
