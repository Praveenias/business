import { Business } from '../types/business';

export function searchBusinesses(businesses: Business[], query: string, categories: string[]): Business[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  return businesses.filter(business => {
    const matchesSearch = normalizedQuery === '' ||
      business.title.toLowerCase().includes(normalizedQuery) ||
      business.subtitle.toLowerCase().includes(normalizedQuery);
      
    const matchesCategory = categories.includes('All') || categories.includes(business.category);
    
    return matchesSearch && matchesCategory;
  });
}