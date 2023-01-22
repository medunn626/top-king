import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'top-king';
  date = '';
  isAdmin = false;

  constructor(
    public auth: AuthService,
  ) {
    this.date = '' + new Date().getFullYear();
    this.isAdmin = localStorage.getItem('productTier') === 'admin';
   }

  signOut() {
    this.auth.signOut()
  }

  ngOnInit() {
    this.auth.setStatus()
  }
}
