export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  comment: string;
  contacted: boolean;
}

export type FilterType = 'all' | 'contacted';
