import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/landing/login/login.component';
import { ClientLayoutComponent } from './views/client/client-layout/client-layout.component';
import { AdminLayoutComponent } from './views/admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './views/admin/admin-layout/pages/admin-dashboard/admin-dashboard.component';
import { ClientDashboardComponent } from './views/client/client-layout/pages/client-dashboard/client-dashboard.component';
import { NotFoundComponent } from './views/error-pages/not-found/not-found.component';
import { ResetPasswordComponent } from './views/landing/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewPasswordComponent } from './views/landing/new-password/new-password.component';
import { NgZorroModule } from './modules/ng-zorro.module';
import { IconsProviderModule } from './modules/icons-provider.module';
import { HttpConfigInterceptor } from './helpers/http.interceptor';
import { ListingComponent } from './views/admin/admin-layout/pages/listing/listing.component';
import { UserComponent } from './views/admin/admin-layout/pages/user/user.component';
import { TransactionComponent } from './views/admin/admin-layout/pages/transaction/transaction.component';
import { TenantComponent } from './views/admin/admin-layout/pages/tenant/tenant.component';
import { SubscriptionComponent } from './views/admin/admin-layout/pages/subscription/subscription.component';
import { LeaseComponent } from './views/admin/admin-layout/pages/lease/lease.component';
import { AccountComponent } from './views/admin/admin-layout/pages/account/account.component';
import { AddListingComponent } from './views/admin/admin-layout/pages/listing/components/add-listing/add-listing.component';
import { ViewListingComponent } from './views/admin/admin-layout/pages/listing/components/view-listing/view-listing.component';
import en from '@angular/common/locales/en';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { UploadListingsComponent } from './views/admin/admin-layout/pages/listing/components/upload-listings/upload-listings.component';
import { AddUserComponent } from './views/admin/admin-layout/pages/user/components/add-user/add-user.component';
import { ViewUserComponent } from './views/admin/admin-layout/pages/user/components/view-user/view-user.component';
import { SettingsComponent } from './views/admin/admin-layout/pages/settings/settings.component';
import { SubscriptionTypeComponent } from './views/admin/admin-layout/pages/settings/components/subscription-type/subscription-type.component';
import { AddSubscriptionTypeComponent } from './views/admin/admin-layout/pages/settings/components/subscription-type/components/add-subscription-type/add-subscription-type.component';
import { AddSubscriptionComponent } from './views/admin/admin-layout/pages/subscription/components/add-subscription/add-subscription.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientLayoutComponent,
    AdminLayoutComponent,
    AdminDashboardComponent,
    ClientDashboardComponent,
    NotFoundComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    ListingComponent,
    UserComponent,
    TransactionComponent,
    TenantComponent,
    SubscriptionComponent,
    LeaseComponent,
    AccountComponent,
    AddListingComponent,
    ViewListingComponent,
    UploadListingsComponent,
    AddUserComponent,
    ViewUserComponent,
    SettingsComponent,
    SubscriptionTypeComponent,
    AddSubscriptionTypeComponent,
    AddSubscriptionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    IconsProviderModule,
    NgZorroModule,
  
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true,
  },{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
