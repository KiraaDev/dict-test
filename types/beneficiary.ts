export type ASSISTANCE_CATEGORY = {
  id: number;
  category_name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type Beneficiary = {
  id: number;
  beneficiary_id: string;
  full_name: string;
  address: string;
  contact_number: string | null;
  assistance_category_id: number;
  created_at: string | null; // timestamp
  updated_at: string | null; // timestamp
};