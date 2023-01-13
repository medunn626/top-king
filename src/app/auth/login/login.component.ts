import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = <any>{};
  isNewUser = false;

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['home'])
    }
  }

  login() {
    // if (this.isNewUser) {
    //   this.auth.signUp(this.user.email, this.user.password, this.user.password_confirmation)
    // } else {
    //   this.auth.login(this.user.email, this.user.password)
    // }
    this.auth.mockLogin();
  }

  toggleIsNewUser() {
    this.isNewUser = !this.isNewUser;
  }
}
