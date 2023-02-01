import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { ContactModule } from './contact/contact.module';
import { ContentModule } from './content/content.module';
import { HomeModule } from './home/home.module';
import { PackagesModule } from './packages/packages.module';
import { ReferralDialogModule } from './referral-dialog/referral-dialog.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AuthModule,
    AppRoutingModule,
    ContactModule,
    PackagesModule,
    ContentModule,
    HomeModule,
    ReferralDialogModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
