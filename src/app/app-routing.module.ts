import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactCompnent } from './contact/contact.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { PackagesComponent } from './packages/packages.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactCompnent
  },
  {
    path: 'packages',
    component: PackagesComponent
  },
  {
    path: 'content',
    component: ContentComponent
  },
  // {
  //   path: 'auth/change-password',
  //   component: ChangePasswordComponent
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
