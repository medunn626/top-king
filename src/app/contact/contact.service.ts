import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Contact {
    name: string;
    email: string;
    message: string;
}

@Injectable()
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  sendInquiry(contactRequest: Contact) {
    return this.http.post<void>(`${environment.apiServer}/contact`, contactRequest);
  }

}