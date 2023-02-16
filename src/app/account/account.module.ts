import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { AccountComponent } from './account.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './account.service';
import { LoginService } from '../login/login.service';
import { UpdateUserDialog } from './update-user-dialog/update-user-dialog.component';
import { PhoneMaskDirective } from './update-user-dialog/phone-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    AccountComponent,
    UpdateUserDialog,
    PhoneMaskDirective
  ],
  providers: [AccountService, LoginService]
})
export class AccountModule { }
