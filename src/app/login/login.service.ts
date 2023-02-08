import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface UserResponse {
  id?: number;
  productTier: string;
  phoneNumber?: string;
}

export interface UserRequest {
  id?: number;
  email: string;
  password: string;
  name?: string;
  phoneNumber?: string;
  productTier?: string;
}

@Injectable()
export class LoginService {
  loggedIn = false;
  loginFailure = false;
  signUpFailure = false;
  signOutFailure = false;
  isAdmin = false;

  constructor(
    public router: Router,
    private http: HttpClient
  ) { }

  login(userToSave: UserRequest) {
    const params = new HttpParams()
      .append('email', userToSave.email)
      .append('password', userToSave.password)
      .append('productTier', userToSave.productTier ?? '');
    this.http.get<UserResponse>(`${environment.apiServer}/login`, {params})
    .subscribe(
      (response) => {
        localStorage.setItem('userId', '' + response.id);
        localStorage.setItem('productTier', response.productTier);
        localStorage.setItem('phoneNumber', response.phoneNumber ?? '');
        this.loginFailure = false;
        this.signUpFailure = false;
        this.setStatus();
        this.determineLoginNavigation(userToSave.productTier ?? '');
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

  signUp(userToCreate: UserRequest) {
    const emailField = <HTMLInputElement>document.getElementById('emailLog');
    const passwordField = <HTMLInputElement>document.getElementById('passwordLog');
    const passwordConfirmField = <HTMLInputElement>document.getElementById('passwordConfirmLog');
    const phoneNumberField = <HTMLInputElement>document.getElementById('phoneNumberLog');

    this.http.post<UserResponse>(`${environment.apiServer}/sign-up`, userToCreate)
    .subscribe(
      (response) => {
        localStorage.setItem('userId', '' + response.id);
        localStorage.setItem('productTier', response.productTier);
        localStorage.setItem('phoneNumber', response.phoneNumber ?? '');
        this.loginFailure = false;
        this.signUpFailure = false;
        this.setStatus();
        this.determineLoginNavigation(userToCreate.productTier ?? '');
      }, 
      () => {
        this.signUpFailure = true;
        this.loginFailure = false;
        emailField.value = '';
        passwordField.value = '';
        passwordConfirmField.value = '';
        phoneNumberField.value = '';
      }
    )
  }

  sendPasswordResetLink(email: string) {
    this.http.post<void>(`${environment.apiServer}/password-reset`, email)
    .subscribe(
      () => {
        localStorage.setItem('crossCheckEmail', email);
        this.router.navigate(['/change-password/']);
      },
      () => {
        this.signUpFailure = false;
        this.loginFailure = true;
      });
    }

  signOut() {
    localStorage.clear();
    this.setStatus();
    this.router.navigate(['/'])
  }

  setStatus(): void {
    this.loggedIn = !!localStorage.getItem('userId');
    this.isAdmin = this.loggedIn && localStorage.getItem('productTier') === 'admin';
  }

  determineLoginNavigation(intendedPlanToPurchase: string): void {
    if (intendedPlanToPurchase) {
      this.router.navigate(['/plans/']);
    } else {
      this.router.navigate(['/content/']);
    }
  }

}
