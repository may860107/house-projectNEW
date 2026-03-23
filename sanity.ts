import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'dd04z9gp', 
  dataset: 'production',
  apiVersion: '2024-03-22', 
  useCdn: true, 
});