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
export class ChangePasswordService {
  changePasswordFailure = false;
  incorrectCode = false;
  codeConfirmed = false;

  constructor(
    public router: Router,
    private http: HttpClient
  ) { }

  confirmCode(code: string, email: string) {
    const params = new HttpParams().append('email', email);
    this.http.get<number>(`${environment.apiServer}/confirm-code/${code}`, {params})
    .subscribe(
      (userId) => {

        if (userId) {
          localStorage.setItem('userId', '' + userId);
          this.codeConfirmed = true;
          this.changePasswordFailure = false;
          this.incorrectCode = false;
        } else {
          this.incorrectCode = true;
          this.codeConfirmed = false;
          this.changePasswordFailure = false;
        }
      },
      () => {
        this.changePasswordFailure = true;
        this.incorrectCode = false;
        this.codeConfirmed = false;
      }
    );
  }

  changePassword(userToSave: UserRequest) {
    const passwordField = <HTMLInputElement>document.getElementById('passwordLog');
    const passwordConfirmField = <HTMLInputElement>document.getElementById('passwordConfirmLog');

    this.http.put<UserResponse>(`${environment.apiServer}/change-password`, userToSave)
    .subscribe(
      (savedUser) => {
        localStorage.setItem('userId', '' + savedUser.id);
        localStorage.setItem('productTier', savedUser.productTier);
        localStorage.setItem('phoneNumber', savedUser.phoneNumber ?? '');
        this.changePasswordFailure = false;
        this.router.navigate(['/content/']);
      }, 
      () => {
        this.changePasswordFailure = true;
        passwordField.value = '';
        passwordConfirmField.value = '';
      }
    )
  }

}
