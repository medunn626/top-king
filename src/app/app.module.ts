import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { ContactModule } from './contact/contact.module';
import { ContentModule } from './content/content.module';
import { HomeModule } from './home/home.module';
import { PackagesModule } from './packages/packages.module';
import { ReferralDialogModule } from './referral-dialog/referral-dialog.module';
import { LoginService } from './login/login.service';
import { ChangePasswordModule } from './change-password/change-password.module';
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AccountModule,
    AdminModule,
    LoginModule,
    AppRoutingModule,
    ContactModule,
    PackagesModule,
    ContentModule,
    HomeModule,
    ReferralDialogModule,
    ChangePasswordModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
