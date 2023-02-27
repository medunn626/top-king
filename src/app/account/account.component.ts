import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { AccountService } from './account.service';
import { UpdateUserDialog, UserDialogData } from './update-user-dialog/update-user-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user = <any>{};
  smallerScreen = false;
  
  constructor(
    public accountService: AccountService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('userId')) {
      this.router.navigate(['/']);
    }
    this.accountService.userHasPlan = !!localStorage.getItem('productTier');
    this.onResize();
  }

  modifyAccountInfo(): void {
    const data: UserDialogData = {
      currentEmail: localStorage.getItem('clientEmail') ?? '',
      currentName: localStorage.getItem('clientName') ?? '',
      currentPhoneNumber: localStorage.getItem('phoneNumber') ?? ''
    };
    const dialogRef = this.dialog.open(UpdateUserDialog, {
      disableClose: true,
      width: '75%',
      data
    });
    dialogRef.afterClosed().subscribe(updatedUser => {
      if (updatedUser) {
        this.accountService.updateUser(updatedUser);
      }
    });
  }

  removePlan(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      disableClose: true,
      width: '75%'
    });
    dialogRef.componentInstance.confirmMessage = `Please confirm you would like to remove / switch your current plan`;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userId = localStorage.getItem('userId') ?? '';
        if (userId) {
          this.accountService.removePlan(userId);
        }  
      }
    });
  }

  signOut(): void {
    this.accountService.signOut();
  }

  @HostListener('window:resize')
  onResize() {
    this.smallerScreen = window.innerWidth < 900;
  }
}
