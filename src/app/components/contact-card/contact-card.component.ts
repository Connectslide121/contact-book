import { Component, Input, signal } from '@angular/core';
import { Contact, FilterType } from '../../models/contacts';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [],
  templateUrl: './contact-card.component.html',
  styleUrl: './contact-card.component.css',
})
export class ContactCardComponent {
  @Input() contact!: Contact;

  changeEditing(contact: Contact, editing: boolean) {
    contact.editing = editing;
  }

  editContact(contact: Contact) {
    contact.editing = false;
  }
}
