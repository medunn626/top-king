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
  loggedInAndConfirmed = false;
  loggedInAndUnConfirmed = false;
  loginFailure = false;
  signUpFailure = false;
  signOutFailure = false;
  incorrectCode = false;
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
      (existingUser) => {
        if (existingUser.id) {
          localStorage.setItem('userId', '' + existingUser.id);
          localStorage.setItem('productTier', existingUser.productTier);
          localStorage.setItem('phoneNumber', existingUser.phoneNumber ?? '');
          this.loginFailure = false;
          this.signUpFailure = false;
          this.setStatus();
          this.determineLoginNavigation(userToSave.productTier ?? '');
        } else {
          this.loggedInAndUnConfirmed = true;
        }
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
    this.http.post<UserResponse>(`${environment.apiServer}/sign-up`, userToCreate)
    .subscribe(
      (createdUser) => {
        this.loggedInAndUnConfirmed = true;
        this.loginFailure = false;
        this.signUpFailure = false;
        localStorage.setItem('unconfirmedUserId', '' + createdUser.id);
      }, 
      () => {
        const emailField = <HTMLInputElement>document.getElementById('emailLog');
        const passwordField = <HTMLInputElement>document.getElementById('passwordLog');
        const passwordConfirmField = <HTMLInputElement>document.getElementById('passwordConfirmLog');
        const phoneNumberField = <HTMLInputElement>document.getElementById('phoneNumberLog');
        this.signUpFailure = true;
        this.loginFailure = false;
        emailField.value = '';
        passwordField.value = '';
        passwordConfirmField.value = '';
        phoneNumberField.value = '';
      }
    )
  }

  confirmEmail(code: string) {
    const id = localStorage.getItem('unconfirmedUserId') ?? '';
    if (id) {
      this.http.get<UserResponse>(`${environment.apiServer}/confirm-code/user/${id}/code/${code}`, {})
      .subscribe(
        (savedUser) => {
          if (savedUser.id) {
            localStorage.setItem('userId', '' + savedUser.id);
            localStorage.setItem('productTier', savedUser.productTier);
            localStorage.setItem('phoneNumber', savedUser.phoneNumber ?? '');
            localStorage.removeItem('unconfirmedUserId');
            this.loggedInAndUnConfirmed = false;
            this.incorrectCode = false;
            this.setStatus();
            this.determineLoginNavigation(savedUser.productTier ?? '');
          } else {
            this.incorrectCode = true;
          }
        },
        () => {
          this.signUpFailure = true;
          this.loginFailure = false;
          this.incorrectCode = false;
          const codeField = <HTMLInputElement>document.getElementById('codeLog');
          codeField.value = '';
        }
      );
    }
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
    this.loggedInAndConfirmed = !this.loggedInAndUnConfirmed && !!localStorage.getItem('userId');
    this.isAdmin = this.loggedInAndConfirmed && localStorage.getItem('productTier') === 'admin';
  }

  determineLoginNavigation(intendedPlanToPurchase: string): void {
    if (intendedPlanToPurchase) {
      this.router.navigate(['/plans/']);
    } else {
      this.router.navigate(['/content/']);
    }
  }

}
