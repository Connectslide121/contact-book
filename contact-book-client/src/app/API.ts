import axios from 'axios';
import { Contact } from './models/contacts';

const url = 'https://contact-book-api.azurewebsites.net/api/contact';

export async function getAllContacts(): Promise<Contact[]> {
  const response = await axios.get('api/contact').catch(function (error) {
    alert('Error fetching contacts, there is no connection to the server');
    console.log('Error fetching contacts:', error);
  });
  return response!.data;
}

export async function createContact(newContact: Contact): Promise<void> {
  await axios.post('api/contact', newContact).catch(function (error) {
    alert('Error adding contact, there is no connection to the server');
    console.log('Error adding contact:', error);
  });
}

export async function updateContact(contact: Contact): Promise<void> {
  await axios.put(`api/contact/${contact.id}`, contact).catch(function (error) {
    alert('Error updating contact, there is no connection to the server');
    console.log('Error updating contact:', error);
  });
}

export async function deleteContact(contactId: string): Promise<void> {
  await axios.delete(`api/contact/${contactId}`).catch(function (error) {
    alert('Error deleting contact, there is no connection to the server');
    console.log('Error deleting contact:', error);
  });
}
