import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PackagesComponent } from './packages.component';
import { PackagesService } from './packages.service';
import { ConsultingFormDialog } from './consulting-form-dialog/consulting-form-dialog.component';
import { PhoneMaskDirective } from './consulting-form-dialog/phone-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule
  ],
  declarations: [
    ConsultingFormDialog,
    PackagesComponent,
    PhoneMaskDirective
  ],
  providers: [PackagesService]
})
export class PackagesModule { }
