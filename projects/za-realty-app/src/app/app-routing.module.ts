import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCanLoadGuard } from './guards/auth.can-load.guard';
import { LoggedInCanActivateGuard } from './guards/logged-in.can-activate.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
    canLoad: [AuthCanLoadGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
    canActivate: [LoggedInCanActivateGuard]
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule),
      canLoad: [AuthCanLoadGuard]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then(m => m.AdminModule),
      canLoad: [AuthCanLoadGuard],
      data: { expectedRole: 'admin' }
  },
  {
    path: '**',
    redirectTo: 'home',
    canLoad: [AuthCanLoadGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
