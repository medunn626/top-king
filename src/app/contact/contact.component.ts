import { Component } from '@angular/core';
import { Contact, ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  data = <Contact>{};
  sendInquiryFailure = false;

  constructor(
    private readonly contactService: ContactService
  ) { }

  sendInquiry(): void {
    if (this.data.name && this.data.email && this.data.message) {
      this.contactService.sendInquiry(this.data)
      .subscribe(
        () => {
          const nameField = <HTMLInputElement>document.getElementById('nameField');
          const emailField = <HTMLInputElement>document.getElementById('emailField');
          const messageField = <HTMLInputElement>document.getElementById('messageField');
          nameField.value = '';
          emailField.value = '';
          messageField.value = '';
        },
        () => this.sendInquiryFailure = true)
    }
  }
}
