import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { ContactModule } from './contact/contact.module';
import { ContentModule } from './content/content.module';
import { HomeModule } from './home/home.module';
import { PackagesModule } from './packages/packages.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContactModule,
    PackagesModule,
    ContentModule,
    HomeModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
