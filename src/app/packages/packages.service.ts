import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../login/login.service';
import { Observable } from 'rxjs';

@Injectable()
export class PackagesService {

  constructor(
    public router: Router,
    private http: HttpClient
  ) { }

  setupConsultingCall(email: string) {
    return this.http.post<void>(`${environment.apiServer}/consultation`, email);
  }

}
