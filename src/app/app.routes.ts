import { Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';

export const routes: Routes = [
  { path: 'contacts', component: ContactsComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
];
