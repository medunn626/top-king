import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modify-video-dialog',
  templateUrl: './modify-video-dialog.component.html',
  styleUrls: ['./modify-video-dialog.component.css']
})
export class ModifyVideoDialog {
  constructor(public dialogRef: MatDialogRef<ModifyVideoDialog>) {}
  isUpdatingTier: boolean;
  videoName = '';
  videoTiers = '';
  updatedVideoName: string;

  updateTiers(stringValue: string) {
    this.videoTiers = stringValue;
  }

  cancel() {
    this.dialogRef.close(false);
  }

  update() {
    if (this.isUpdatingTier) {
      this.dialogRef.close(this.videoTiers);
    } else {
      this.dialogRef.close(this.updatedVideoName);
    }
  }
}