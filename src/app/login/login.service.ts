import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface UserResponse {
  id?: number;
  email: string;
  name: string;
  phoneNumber?: string;
  productTier: string;
}

export interface UserRequest {
  id?: number;
  email: string;
  password?: string;
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
  emailExists = false;
  incorrectCode = false;
  isAdmin = false;

  constructor(
    public router: Router,
    private http: HttpClient
  ) { }

  login(userToFindOrUpdate: UserRequest) {
    this.http.put<UserResponse>(`${environment.apiServer}/login`, userToFindOrUpdate)
    .subscribe(
      (existingUser) => {
        if (existingUser.email) {
          localStorage.setItem('userId', '' + existingUser.id);
          localStorage.setItem('productTier', existingUser.productTier ?? '');
          localStorage.setItem('clientEmail', existingUser.email);
          localStorage.setItem('phoneNumber', existingUser.phoneNumber ?? '');
          localStorage.setItem('clientName', existingUser.name);
          this.loginFailure = false;
          this.signUpFailure = false;
          this.setStatus();
          this.router.navigate(['/content/']);
        } else {
          localStorage.setItem('unconfirmedUserId', '' + existingUser.id);
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
        if (!createdUser.id) {
          this.emailExists = true;
        } else {
          this.loggedInAndUnConfirmed = true;
          this.loginFailure = false;
          this.signUpFailure = false;
          this.emailExists = false;
          localStorage.setItem('unconfirmedUserId', '' + createdUser.id);
        }
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
            localStorage.setItem('productTier', savedUser.productTier ?? '');
            localStorage.setItem('clientEmail', savedUser.email);
            localStorage.setItem('phoneNumber', savedUser.phoneNumber ?? '');
            localStorage.setItem('clientName', savedUser.name);
            localStorage.removeItem('unconfirmedUserId');
            this.loggedInAndUnConfirmed = false;
            this.incorrectCode = false;
            this.setStatus();
            this.router.navigate(['/content/']);
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

  setStatus(): void {
    this.loggedInAndConfirmed = !this.loggedInAndUnConfirmed && !!localStorage.getItem('userId');
    this.isAdmin = this.loggedInAndConfirmed && localStorage.getItem('productTier') === 'admin';
  }

}
