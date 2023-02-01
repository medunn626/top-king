import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class ReferralDialogService {

  constructor(private http: HttpClient) { }

  saveReferral(clientName: string, clientId: string, referralEmail: string): Observable<void> {
    const url = `${environment.apiServer}/referral/client/${clientName}/${clientId}/email/${referralEmail}`;
    return this.http.post<void>(url, {});
  }

}