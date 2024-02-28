import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { NewContactFormComponent } from './components/new-contact-form/new-contact-form.component';
import { Contact } from './models/contacts';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
  contactList = signal<Contact[]>([
    {
      id: '35b9b8ab-4423-4d6f-8af8-e338c00119a9',
      name: 'Elinor',
      email: 'easbery0@godaddy.com',
      phone: '298-738-2775',
      company: 'Vidoo',
      comment:
        'in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in hac',
      editing: false,
    },
    {
      id: '367827db-4d0c-4957-aa6d-cc4f67e2c039',
      name: 'Travers',
      email: 'tfidgeon1@ow.ly',
      phone: '632-265-8300',
      company: 'Pixoboo',
      comment:
        'nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta',
      editing: false,
    },
    {
      id: 'cbb52160-741e-46f7-9c07-4bdc6fbf17a5',
      name: 'Britteny',
      email: 'bperet2@etsy.com',
      phone: '951-447-9119',
      company: 'Meetz',
      comment:
        'ipsum ac tellus semper interdum mauris ullamcorper purus sit amet',
      editing: false,
    },
    {
      id: '07fba564-a8fc-4780-b8a5-ecc6107f10c4',
      name: 'Judith',
      email: 'jguice3@foxnews.com',
      phone: '863-582-4712',
      company: 'Realpoint',
      comment:
        'pellentesque volutpat dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut',
      editing: false,
    },
    {
      id: 'ae9cf7b9-53dc-45b7-a5f7-ef2de2cd9446',
      name: 'Wolfgang',
      email: 'wblunsen4@storify.com',
      phone: '503-690-9024',
      company: 'Chatterbridge',
      comment: 'in hac habitasse platea dictumst maecenas ut massa quis augue',
      editing: false,
    },
    {
      id: '69fa6eb0-25ac-4453-a371-d952c7c76378',
      name: 'Kermit',
      email: 'ktomicki5@hexun.com',
      phone: '395-996-5796',
      company: 'Meezzy',
      comment:
        'vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a',
      editing: false,
    },
  ]);

  filteredContacts = signal<Contact[]>(this.contactList());

  addContact(newContact: Contact) {
    this.contactList.set([newContact, ...this.contactList()]);
    this.filteredContacts.set(this.contactList());
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
  }

  deleteContact(contact: Contact) {
    this.contactList.set(this.contactList().filter((c) => c.id !== contact.id));
    this.filteredContacts.set(this.contactList());
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
    return this.filteredContacts;
  }
}
