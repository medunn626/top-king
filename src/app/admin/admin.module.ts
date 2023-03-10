import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from './admin.service';
import { ModifyVideoDialog } from './modify-video-dialog/modify-video-dialog.component';
import { PackagesService } from '../packages/packages.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    RouterModule
  ],
  declarations: [
    AdminComponent,
    ModifyVideoDialog
  ],
  providers: [AdminService, PackagesService]
})
export class AdminModule { }
