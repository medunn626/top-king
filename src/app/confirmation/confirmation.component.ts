import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from './confirmation.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  isLoggedIn = false;
  
  constructor(
    public router: Router,
    public confirmationService: ConfirmationService
  ) {
    this.isLoggedIn = !!localStorage.getItem('userId');
  }
}
