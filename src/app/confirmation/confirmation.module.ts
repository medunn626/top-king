import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmationComponent } from './confirmation.component';
import { ConfirmationService } from './confirmation.service';
import { ConfirmationGuard } from './confirmation.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [ConfirmationComponent],
  providers: [ConfirmationService, ConfirmationGuard]
})
export class ConfirmationModule { }
