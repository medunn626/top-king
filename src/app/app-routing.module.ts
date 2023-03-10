import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { PackagesComponent } from './packages/packages.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountComponent } from './account/account.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConfirmationGuard } from './confirmation/confirmation.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'content',
    component: ContentComponent
  },
  {
    path: 'confirmation/tier/:tier',
    component: ConfirmationComponent,
    canActivate: [ConfirmationGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'plans',
    component: PackagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
