import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'top-king';

  constructor(
    public auth: AuthService,
  ) { }

  signOut() {
    this.auth.signOut()
  }

  login() {
    //
  }

  ngOnInit() {
    this.auth.setStatus()
  }
}
