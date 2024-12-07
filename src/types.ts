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
}

export interface Message {
  type: 'bot' | 'user';
  content: string;
  component?: string;
}