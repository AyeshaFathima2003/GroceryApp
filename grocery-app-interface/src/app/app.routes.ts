import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) },
  { path: 'user', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) }
];

