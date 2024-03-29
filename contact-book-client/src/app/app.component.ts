import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { NewContactFormComponent } from './components/new-contact-form/new-contact-form.component';
import { Contact } from './models/contacts';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
} from '../app/API';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ContactCardComponent,
    NewContactFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  contactList = signal<Contact[]>([]);
  filteredContacts = signal<Contact[]>([]);
  count: number = this.filteredContacts().length;

  async ngOnInit() {
    await getAllContacts().then((contacts) => {
      this.contactList.set(contacts!);
    });
    this.filteredContacts = signal<Contact[]>(this.contactList());
    this.count = this.filteredContacts().length;
  }

  addContact(newContact: Contact) {
    createContact(newContact);
    this.contactList.set([...this.contactList(), newContact]);
    this.filteredContacts.set(this.contactList());
    this.count = this.filteredContacts().length;
  }

  changeEditing(contact: Contact, editing: boolean) {
    contact.editing = editing;
  }

  editContact(updatedContact: Contact) {
    this.contactList.set(
      this.contactList().map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    this.filteredContacts.set(this.contactList());
    updateContact(updatedContact);
  }

  deleteContact(contact: Contact) {
    this.contactList.set(this.contactList().filter((c) => c.id !== contact.id));
    this.filteredContacts.set(this.contactList());
    deleteContact(contact.id);
    this.count = this.filteredContacts().length;
  }

  filter: FormControl = new FormControl('', { nonNullable: true });

  filterContacts() {
    this.filteredContacts.set(
      this.contactList().filter((contact) =>
        Object.values(contact).some((value) =>
          String(value).toLowerCase().includes(this.filter.value.toLowerCase())
        )
      )
    );

    this.count = this.filteredContacts().length;

    return this.filteredContacts;
  }
}
