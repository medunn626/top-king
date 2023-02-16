import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Referral, ReferralDialogService } from './referral-dialog.service';

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
    const email = this.data.referralEmail;
    const paymentMethod = this.data.paymentMethod;
    const paymentHandle = this.data.paymentHandle;
    const affiliateId = +(localStorage.getItem('userId') ?? '');
    if (email && paymentMethod && paymentHandle && affiliateId) {
      const referralRequest: Referral = {
        email,
        paymentMethod,
        paymentHandle,
        affiliateId
      }
      this.referralDialogService.saveReferral(referralRequest)
      .subscribe(
        () => this.dialogRef.close(true),
        () => this.dialogRef.close(false)
      );
    }
  }

}