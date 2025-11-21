
'use client';
import { collection, doc, writeBatch, getDocs, Firestore } from 'firebase/firestore';
import { registeredSites, SiteEntry } from './registered-sites';

const SEED_FLAG_KEY = 'firestore_seeded_agencias';

// This function will seed the Firestore database with the sites from registered-sites.ts
export async function seedAgencias(db: Firestore) {
  // Check if seeding has already been done to avoid duplicate writes.
  if (sessionStorage.getItem(SEED_FLAG_KEY)) {
    return;
  }

  console.log('Starting to seed "agencias" collection...');
  const agenciasCollection = collection(db, 'agencias');
  
  // Use a batch to write all documents at once for efficiency.
  const batch = writeBatch(db);

  registeredSites.forEach((site) => {
    // We use the sigla as the document ID if an ID is not provided.
    const docRef = doc(agenciasCollection, site.id || site.sigla);
    batch.set(docRef, site);
  });

  try {
    await batch.commit();
    console.log('Successfully seeded "agencias" collection.');
    // Set a flag in session storage to indicate that seeding is complete for this session.
    sessionStorage.setItem(SEED_FLAG_KEY, 'true');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
