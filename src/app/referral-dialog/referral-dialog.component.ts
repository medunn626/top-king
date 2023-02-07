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

  updatePaymentMethod(value) {
    console.log(value);
  }

  confirm() {
    const referralEmail = this.data.referralEmail;
    const clientPaymentMethod = this.data.paymentMethod;
    const clientPaymentHandle = this.data.paymentHandle;
    const userId = localStorage.getItem('userId') ?? '';
    if (referralEmail && clientPaymentMethod && clientPaymentHandle && userId) {
      this.referralDialogService.saveReferral(userId, clientPaymentMethod, clientPaymentHandle, referralEmail)
      .subscribe(
        () => this.dialogRef.close(true),
        () => this.dialogRef.close(false)
      );
    }
  }

}