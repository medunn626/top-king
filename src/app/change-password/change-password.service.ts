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
  changePasswordSuccess = false;
  changePasswordFailure = false;
  codeConfirmed = false;
  checkComplete = false;

  constructor(
    public router: Router,
    private http: HttpClient
  ) { }

  confirmCode(code: string, email: string) {
    const params = new HttpParams().append('email', email);
    this.http.get<number>(`${environment.apiServer}/confirm-code/${code}`, {params})
    .subscribe(
      (userId) => {
        this.codeConfirmed = !!userId;
        if (userId) {
          localStorage.setItem('userId', '' + userId);
          this.changePasswordFailure = false;
          this.checkComplete = true;
        }
      },
      () => this.changePasswordFailure = true
    );
  }

  changePassword(userToSave: UserRequest) {
    const passwordField = <HTMLInputElement>document.getElementById('passwordLog');
    const passwordConfirmField = <HTMLInputElement>document.getElementById('passwordConfirmLog');

    this.http.put<UserResponse>(`${environment.apiServer}/change-password`, userToSave)
    .subscribe(
      (response) => {
        localStorage.setItem('userId', '' + response.id);
        localStorage.setItem('productTier', response.productTier);
        localStorage.setItem('phoneNumber', response.phoneNumber ?? '');
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
