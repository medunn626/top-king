import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  data = <any>{};

  sendEmail(data) {
    const mapForm = document.createElement("form");
    mapForm.method = "POST";
    mapForm.action = "https://formsubmit.co/medunn626@yahoo.com";

    // Name:
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.value = data.name;
    mapForm.appendChild(nameInput);
    
    // Email:
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.value = data.email;
    mapForm.appendChild(emailInput);

    // Text:
    const messageInput = document.createElement("textarea");
    messageInput.name = "message";
    messageInput.value = data.message;
    mapForm.appendChild(messageInput);

    // Subject:
    const subjectInput = document.createElement("input");
    subjectInput.type = "hidden";
    subjectInput.name = "_subject";
    subjectInput.value = "New Client Email!"
    mapForm.appendChild(subjectInput);

    // Next:
    const nextInput = document.createElement("input");
    nextInput.type = "hidden";
    nextInput.name = "_next";
    nextInput.value = "https://medunn626.github.io/top-king/"
    mapForm.appendChild(nextInput);

    document.body.appendChild(mapForm);

    mapForm.submit();
  }
}
