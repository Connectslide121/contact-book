export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  comment: string;
  contacted: boolean;
  editing: boolean;
}

export type FilterType = 'all' | 'contacted' | 'uncontacted';
