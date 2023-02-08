import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { PhoneMaskDirective } from './phone-mask.directive';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [
    LoginComponent,
    PhoneMaskDirective
  ],
  providers: [LoginService]
})
export class LoginModule { }
