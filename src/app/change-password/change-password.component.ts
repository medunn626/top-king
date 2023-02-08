import { Component, OnInit } from '@angular/core';
import { UserRequest } from '../login/login.service';
import { Router } from '@angular/router';
import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user = <any>{};
  passwordsMatch = true;

  constructor(
    public service: ChangePasswordService,
    public router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      this.router.navigate(['home'])
    }
  }

  public submit(): void {
    if (this.service.codeConfirmed) {
      this.changePassword();
    } else {
      this.confirmCode();
    }
  }

  private confirmCode(): void {
    const crossCheckEmail: string  = localStorage.getItem('crossCheckEmail') ?? '';
    const code: string = this.user.code;
    this.service.confirmCode(code, crossCheckEmail);
  }

  private changePassword(): void {
    this.passwordsMatch = this.user.passwordConfirmation === this.user.password;
    if (this.passwordsMatch) {
      const userToSave: UserRequest = {
        id: +(localStorage.getItem('userId') ?? ''),
        email: this.user.email,
        password: this.user.password,
      }
      this.service.changePassword(userToSave);
    }
  }

}
