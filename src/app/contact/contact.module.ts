import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';
import { ContactService } from './contact.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [ContactComponent],
  providers: [ContactService]
})
export class ContactModule { }
