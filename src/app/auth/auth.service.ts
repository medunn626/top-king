import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface UserResponse {
  id: string;
  productTier: string;
}

@Injectable()
export class AuthService {
  loggedIn = false;
  loginFailure = false;
  signUpFailure = false;
  signOutFailure = false;
  changePasswordSuccess = false;
  changePasswordFailure = false;

  constructor(
    public router: Router,
    private http: HttpClient
  ) { }

  login(email: string, password: string, intendedPlanToPurchase: string) {
    const params = new HttpParams()
      .append('email', email)
      .append('password', password)
      .append('productTier', intendedPlanToPurchase);
    this.http.get<UserResponse>(`${environment.apiServer}/login`, {params})
    .subscribe(
      (response) => {
        localStorage.setItem('userId', response.id);
        localStorage.setItem('productTier', response.productTier);
        this.loginFailure = false;
        this.signUpFailure = false;
        this.setStatus();
        this.determineLoginNavigation(intendedPlanToPurchase);
      },
      () => {
        this.loginFailure = true;
        this.signUpFailure = false;
        const emailField = <HTMLInputElement>document.getElementById('emailLog');
        const passwordField = <HTMLInputElement>document.getElementById('passwordLog');
        emailField.value = '';
        passwordField.value = '';
      });
  }

  signUp(email: string, password: string, passwordConfirmation: string, intendedPlanToPurchase: string) {
    const emailField = <HTMLInputElement>document.getElementById('emailLog');
    const passwordField = <HTMLInputElement>document.getElementById('passwordLog');
    const passwordConfirmField = <HTMLInputElement>document.getElementById('passwordConfirmLog');
    if (password === passwordConfirmation) {
      const params = new HttpParams()
        .append('email', email)
        .append('password', password)
        .append('productTier', intendedPlanToPurchase);
      this.http.post<UserResponse>(`${environment.apiServer}/sign-up`, {}, {params})
      .subscribe(
        (response) => {
          localStorage.setItem('userId', response.id);
          localStorage.setItem('productTier', response.productTier);
          this.loginFailure = false;
          this.signUpFailure = false;
          this.setStatus();
          this.determineLoginNavigation(intendedPlanToPurchase);
        }, 
        () => {
          this.signUpFailure = true;
          this.loginFailure = false;
          emailField.value = '';
          passwordField.value = '';
          passwordConfirmField.value = '';
        }
      )
    } else {
      this.signUpFailure = true
      this.loginFailure = false
      emailField.value = '';
      passwordField.value = '';
      passwordConfirmField.value = '';
    }
  }

  signOut() {
    localStorage.clear();
    this.setStatus();
    this.router.navigate(['/'])
  }

  setStatus(): void {
    this.loggedIn = !!localStorage.getItem('userId');
  }

  determineLoginNavigation(intendedPlanToPurchase: string): void {
    if (intendedPlanToPurchase) {
      this.router.navigate(['/plans/']);
    } else {
      this.router.navigate(['/content/']);
    }
  }

}
