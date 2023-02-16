import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-consulting-form-dialog',
  templateUrl: './consulting-form-dialog.component.html',
  styleUrls: ['./consulting-form-dialog.component.css']
})
export class ConsultingFormDialog {
  constructor(public dialogRef: MatDialogRef<ConsultingFormDialog>) {
    this.hasProvidedEmail = !!localStorage.getItem('clientEmail');
  }
  data = <any>{};
  hasProvidedEmail: boolean;

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    let email: string;
    if (this.hasProvidedEmail) {
      email = localStorage.getItem('clientEmail') ?? '';
    } else {
      email = this.data.email;
    }
    if (email) {
      this.dialogRef.close(email);
    }
  }

}