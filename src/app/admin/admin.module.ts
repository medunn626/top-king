import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from './admin.service';
import { ModifyVideoDialog } from './modify-video-dialog.component.html/modify-video-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule
  ],
  declarations: [
    AdminComponent,
    ModifyVideoDialog
  ],
  providers: [AdminService]
})
export class AdminModule { }
