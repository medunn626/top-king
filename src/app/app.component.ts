import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'top-king';
  date = '';

  constructor(
    public auth: AuthService,
  ) {
    this.date = '' + new Date().getFullYear();
   }

  signOut() {
    this.auth.signOut();
  }

  ngOnInit() {
    this.auth.setStatus();
  }
}
