import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HttpClientModule } from '@angular/common/http';
import { PhoneMaskDirective } from './login/phone-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    LoginComponent,
    ChangePasswordComponent,
    PhoneMaskDirective
  ]
})
export class AuthModule { }
