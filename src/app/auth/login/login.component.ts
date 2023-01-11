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
  newUser = <any>{};

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
    this.auth.login(this.user.email, this.user.password)
  }

  signUp() {
    this.auth.signUp(this.newUser.email, this.newUser.password, this.newUser.password_confirmation)
  }
}
