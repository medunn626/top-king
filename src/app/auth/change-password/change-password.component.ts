import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword = '';
  newPassword = '';

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/'])
    }
  }

  changePassword() {
    this.auth.changePassword(this.oldPassword, this.newPassword)
  }

  removeMessage() {
    this.auth.removeMessage()
  }

  signOut() {
    this.auth.signOut()
  }

}
