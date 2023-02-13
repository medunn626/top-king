import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { ChangePasswordComponent } from './change-password.component';
import { HttpClientModule } from '@angular/common/http';
import { ChangePasswordService } from './change-password.service';
import { LoginService } from '../login/login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    ChangePasswordComponent
  ],
  providers: [ChangePasswordService, LoginService]
})
export class ChangePasswordModule { }
