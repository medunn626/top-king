import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserRequest } from 'src/app/login/login.service';

export interface UserDialogData {
  currentName: string;
  currentEmail: string;
  currentPhoneNumber: string;
}

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialog {
  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialog>,
    @Inject(MAT_DIALOG_DATA) public inputData: UserDialogData
  ) {}
  user = <any>{};

  cancel() {
    this.dialogRef.close();
  }

  updateUser() {
    const id = localStorage.getItem('userId') ?? '';
    if (id) {
      const userToSave: UserRequest = {
        id: +id,
        email: this.user.email ?? this.inputData.currentEmail,
        name: this.user.name ?? this.inputData.currentName,
        phoneNumber: this.getDeformattedPhoneNumber(this.user.phoneNumber ?? this.inputData.currentPhoneNumber),
      };
      this.dialogRef.close(userToSave);
    }
  }

  private getDeformattedPhoneNumber(formattedPhoneNumber: string): string {
    return formattedPhoneNumber.replace(/[() -]/g, '');
  }
}