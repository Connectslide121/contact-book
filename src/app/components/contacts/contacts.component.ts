import { Component, signal } from '@angular/core';
import { Contact, FilterType } from '../../models/contacts';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
})
export class ContactsComponent {
  contactList = signal<Contact[]>([
    {
      id: 1,
      name: 'John',
      email: '<EMAIL>',
      phone: '555-123-456',
      company: 'Acme',
      comment:
        'Lorem ipsum dolor sit amet, consectetuadipiscielit, sed do eiusmod tempor incididunt ut labore',
      contacted: false,
      editing: false,
    },
    {
      id: 2,
      name: 'Jane',
      email: '<EMAIL>',
      phone: '555-123-456',
      company: 'Acme',
      comment:
        'Lorem ipsum dolor sit amet, consectetuadipiscielit, sed do eiusmod tempor incididunt ut labore. Lorenam ipsum dolor sit amet, consectetuadipiscielit, sed do eiusmod tempor incididunt ut labore',
      contacted: true,
      editing: false,
    },
  ]);

  filter = signal<FilterType>('all');

  changeFilter(filterString: FilterType) {
    this.filter.set(filterString);
  }

  changeEditing(contact: Contact, editing: boolean) {
    contact.editing = editing;
  }
}
