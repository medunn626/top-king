import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: '.modify-video-dialog',
  templateUrl: './modify-video-dialog.component.html',
  styleUrls: ['./modify-video-dialog.component.css']
})
export class ModifyVideoDialog {
  constructor(public dialogRef: MatDialogRef<ModifyVideoDialog>) {}
  
  videoName = '';
  videoTiers = '';

  updateTiers(checkBoxvalue: boolean, stringValue) {
    if (checkBoxvalue) {
      this.videoTiers+= stringValue;
    } else {
      this.videoTiers = this.videoTiers.replace(stringValue, '');
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }

  update() {
    this.dialogRef.close(this.videoTiers);
  }
}