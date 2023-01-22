import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PackagesComponent } from './packages.component';
import { PackagesService } from './packages.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule
  ],
  declarations: [PackagesComponent],
  providers: [PackagesService]
})
export class PackagesModule { }
