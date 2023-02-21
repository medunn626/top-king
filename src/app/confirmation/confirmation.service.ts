import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../login/login.service';

@Injectable()
export class ConfirmationService {
  updatePlanError = false;

  constructor(
    private http: HttpClient
  ) {}

  fulfillPlan(userId: string, productTier: string) {
    this.http.put<UserResponse>(`${environment.apiServer}/plans/user/${userId}/plan/${productTier}`, {})
    .subscribe(
      (response) => {
        this.updatePlanError = false;
        localStorage.setItem('productTier', response.productTier ?? '');
      },
      () => this.updatePlanError = true
    );
  }

}
