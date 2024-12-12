export type BusinessType = 'restaurant' | 'retail' | 'automotive' | 'electronics' | 'd2c';
export type LocationType = 'single' | 'multi';
export type SubscriptionTier = 'starter' | 'growth' | 'enterprise';
export type AdminRole = 'owner' | 'director' | 'manager' | 'authorized_representative';
export type UploadMethod = 'file' | 'link';

export interface PersonalDetails {
  mobile: string;
  role: string;
}

export interface BusinessDetails {
  name: string;
  type?: BusinessType;
  locationType?: LocationType;
  locations?: number;
  mainBranch?: string;
  mainBranchAddress?: string;
  panOrGst?: string;
  taxIdentifier?: string;
  email?:string;
  password?:string;
}


export interface AdminDetails {
  name: string;
  role: AdminRole;
  email: string;
  mobile: string;
  panCard: string;
}

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  feedbacks: string;
  products: string;
  price: string;
  features: string[];
}

export interface Message {
  type: 'bot' | 'user';
  content: string;
  component?: 'subscription' | 'business-type' | 'location-type' | 'admin-role' | 'admin-details' | 'tax-details' | 'product-upload' | 'oauth' ;
}