import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './helpers/admin-auth.guard';
import { DeAuthGuard } from './helpers/de-auth.guard';
import { UserAuthGuard } from './helpers/user-auth.guard';
import { AdminLayoutComponent } from './views/admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './views/admin/admin-layout/pages/admin-dashboard/admin-dashboard.component';
import { ListingComponent } from './views/admin/admin-layout/pages/listing/listing.component';
import { SettingsComponent } from './views/admin/admin-layout/pages/settings/settings.component';
import { SubscriptionComponent } from './views/admin/admin-layout/pages/subscription/subscription.component';
import { TransactionComponent } from './views/admin/admin-layout/pages/transaction/transaction.component';
import { UserComponent } from './views/admin/admin-layout/pages/user/user.component';
import { ClientLayoutComponent } from './views/client/client-layout/client-layout.component';
import { ClientDashboardComponent } from './views/client/client-layout/pages/client-dashboard/client-dashboard.component';
import { NotFoundComponent } from './views/error-pages/not-found/not-found.component';
import { LoginComponent } from './views/landing/login/login.component';
import { NewPasswordComponent } from './views/landing/new-password/new-password.component';
import { ResetPasswordComponent } from './views/landing/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'admin/login',
    data: {
      role: 'admin',
    },
    component: LoginComponent,
    canActivate: [DeAuthGuard],
  },
  {
    path: 'login',
    data: {
      role: 'user',
    },
    component: LoginComponent,
    canActivate: [DeAuthGuard],
  },
  { path: 'reset-password', component: ResetPasswordComponent , canActivate: [DeAuthGuard],},
  { path: 'new-password/:token', component: NewPasswordComponent ,  canActivate: [DeAuthGuard],},
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboad' },
      { path: 'dashboad', component: AdminDashboardComponent },
      { path: 'listings', component: ListingComponent },
      { path: 'subscription', component: SubscriptionComponent },
      { path: 'transaction', component: TransactionComponent },
      { path: 'users', component: UserComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  {
    path: 'layout',
    component: ClientLayoutComponent,
    canActivate: [UserAuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboad' },
      { path: 'dashboad', component: ClientDashboardComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
