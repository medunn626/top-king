import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReferralDialogService } from './referral-dialog.service';

@Component({
  selector: 'app-referral-dialog',
  templateUrl: './referral-dialog.component.html',
  styleUrls: ['./referral-dialog.component.css']
})
export class ReferralDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReferralDialogComponent>,
    private referralDialogService: ReferralDialogService
  ) {}
  data = <any>{};

  cancel() {
    this.dialogRef.close(true);
  }

  confirm() {
    const clientName = this.data.clientName;
    const referralEmail = this.data.referralEmail;
    const userId = localStorage.getItem('userId') ?? '';
    if (clientName && referralEmail && userId) {
      this.referralDialogService.saveReferral(clientName, userId, referralEmail)
      .subscribe(
        () => this.dialogRef.close(true),
        () => this.dialogRef.close(false)
      );
    }
  }

}