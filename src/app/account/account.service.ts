import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginService, UserRequest, UserResponse } from '../login/login.service';

@Injectable()
export class AccountService {
  updateUserFailure = false;
  userHasPlan: boolean;

  constructor(
    public router: Router,
    private http: HttpClient,
    private readonly loginService: LoginService
  ) { }

  updateUser(userToSave: UserRequest) {
    this.http.put<UserResponse>(`${environment.apiServer}/update-user`, userToSave)
    .subscribe(
      (updatedUser) => {
        if (updatedUser.email) {
          this.updateUserFailure = false;
          localStorage.setItem('userId', '' + updatedUser.id);
          localStorage.setItem('clientEmail', updatedUser.email);
          localStorage.setItem('productTier', updatedUser.productTier ?? '');
          localStorage.setItem('phoneNumber', updatedUser.phoneNumber ?? '');
          localStorage.setItem('clientName', updatedUser.name);
        } else {
          this.signOut();
        }
      },
      () => {
        this.updateUserFailure = true;
        const emailField = <HTMLInputElement>document.getElementById('emailEdit');
        const clientNameField = <HTMLInputElement>document.getElementById('clientNameEdit');
        const phoneNumberField = <HTMLInputElement>document.getElementById('phoneNumberEdit');
        emailField.value = '';
        clientNameField.value = '';
        phoneNumberField.value = '';
      });
  }

  removePlan(id: string) {
    this.http.put<void>(`${environment.apiServer}/remove-plan/${id}`, {})
    .subscribe(
      () => {
        localStorage.removeItem('productTier');
        this.userHasPlan = false;
        this.router.navigate(['/plans']);
      },
      () => this.updateUserFailure = true
    );
  }

  signOut() {
    localStorage.clear();
    this.loginService.setStatus();
    this.router.navigate(['/'])
  }

}
