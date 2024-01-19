import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () => import('./components/login/login.component')
  },
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component'),
    canActivate: [authGuard]
  },
  {
    path: "register",
    loadComponent: () => import('./components/register/register.component')
  }
];
