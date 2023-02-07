import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReferralDialogService {

  constructor(private http: HttpClient) { }

  saveReferral(
      clientId: string,
      paymentMethod: string,
      paymentHandle: string,
      referralEmail: string): Observable<void> {
    const url = `${environment.apiServer}/referral/client/${clientId}/payment/${paymentMethod}/${paymentHandle}/email/${referralEmail}`;
    return this.http.post<void>(url, {});
  }

}