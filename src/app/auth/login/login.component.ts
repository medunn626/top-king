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
  intendedPlanToPurchase: string;
  showLoginFirstMessage = false;

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('userId')) {
      this.router.navigate(['home'])
    }
    this.intendedPlanToPurchase = localStorage.getItem('productTierIntendingToPurchase') ?? '';
    this.showLoginFirstMessage = !!this.intendedPlanToPurchase;
  }

  login() {
    if (this.isNewUser) {
      this.auth.signUp(this.user.email, this.user.password, this.user.passwordConfirmation, this.intendedPlanToPurchase)
    } else {
      this.auth.login(this.user.email, this.user.password, this.intendedPlanToPurchase);
    }
  }

  toggleIsNewUser() {
    this.isNewUser = !this.isNewUser;
  }
}
