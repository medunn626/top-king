import { Component, OnInit } from '@angular/core';
import { LoginService, UserRequest } from '../login/login.service';
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
  passwordsMatch = true;
  forgotPassword = false;

  constructor(
    public auth: LoginService,
    public router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      this.router.navigate(['home'])
    }
    this.intendedPlanToPurchase = localStorage.getItem('productTierIntendingToPurchase') ?? '';
    this.showLoginFirstMessage = !!this.intendedPlanToPurchase;
  }

  public login(): void {
    if (this.forgotPassword) {
      this.auth.sendPasswordResetLink(this.user.email);
    } else {
      this.passwordsMatch = !this.isNewUser || (this.user.passwordConfirmation === this.user.password);
      if (this.passwordsMatch) {
        const userToSave: UserRequest = {
          email: this.user.email,
          password: this.user.password,
          name: this.user.name,
          phoneNumber: this.getDeformattedPhoneNumber(),
          productTier: this.intendedPlanToPurchase
        }
        this.isNewUser ? this.auth.signUp(userToSave) : this.auth.login(userToSave);
      }
    }
  }

  public toggleForgotPassword(): void {
    this.forgotPassword = !this.forgotPassword;
  }

  public toggleIsNewUser(): void {
    this.isNewUser = !this.isNewUser;
  }

  private getDeformattedPhoneNumber(): string {
    if (this.user.phoneNumber) {
      const formattedPhoneNumber = this.user.phoneNumber;
      const deformattedNumber = formattedPhoneNumber.replace(/[() -]/g, '');
      return deformattedNumber;
    }
    return '';
  }
}
