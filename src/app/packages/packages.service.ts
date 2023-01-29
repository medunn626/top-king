import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class PackagesService {

  constructor(
    public router: Router,
    private http: HttpClient
  ) { }

  setPlan(productTier: string): Observable<UserResponse> {
    const userId = localStorage.getItem('userId') ?? '';
    return this.http.put<UserResponse>(`${environment.apiServer}/plans/user/${userId}/plan/${productTier}`, {});
  }

}
