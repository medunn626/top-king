import { Component, OnInit } from '@angular/core';
import { AuthService, UserRequest } from '../../auth/auth.service';
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

  constructor(
    public auth: AuthService,
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
    this.passwordsMatch = !this.isNewUser || (this.user.passwordConfirmation === this.user.password);
    if (this.passwordsMatch) {
      const userToSave: UserRequest = {
        email: this.user.email,
        password: this.user.password,
        phoneNumber: this.getDeformattedPhoneNumber(),
        productTier: this.intendedPlanToPurchase
      }
      this.isNewUser ? this.auth.signUp(userToSave) : this.auth.login(userToSave);
    }
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