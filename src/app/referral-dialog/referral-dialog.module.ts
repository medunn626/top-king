import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReferralDialogService } from './referral-dialog.service';
import { ReferralDialogComponent } from './referral-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ],
  declarations: [ReferralDialogComponent],
  providers: [ReferralDialogService]
})
export class ReferralDialogModule { }
