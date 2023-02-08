import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Referral {
  referralEmail: string;
  paymentMethod: string;
  paymentHandle: string;
  affiliateId: number
}

@Injectable()
export class ReferralDialogService {

  constructor(private http: HttpClient) { }

  saveReferral(referralRequest: Referral): Observable<void> {
    const url = `${environment.apiServer}/referral`;
    return this.http.post<void>(url, referralRequest);
  }

}