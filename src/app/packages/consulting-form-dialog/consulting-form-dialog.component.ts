import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-consulting-form-dialog',
  templateUrl: './consulting-form-dialog.component.html',
  styleUrls: ['./consulting-form-dialog.component.css']
})
export class ConsultingFormDialog {
  constructor(public dialogRef: MatDialogRef<ConsultingFormDialog>) {
    this.hasProvidedPhoneNumber = !!localStorage.getItem('phoneNumber');
  }
  data = <any>{};
  hasProvidedPhoneNumber: boolean;

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    let phoneNumber: string;
    if (this.hasProvidedPhoneNumber) {
      phoneNumber = localStorage.getItem('phoneNumber') ?? '';
    } else {
      phoneNumber = this.data.phoneNumber;
    }
    if (phoneNumber) {
      const deformattedNumber = this.getDeformattedPhoneNumber(phoneNumber);
      this.dialogRef.close(deformattedNumber);
    }
  }

  private getDeformattedPhoneNumber(formattedPhoneNumber: string): string {
    return formattedPhoneNumber.replace(/[() -]/g, '');
  }
}