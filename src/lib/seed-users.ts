
'use client';
import { collection, doc, writeBatch, Firestore } from 'firebase/firestore';
import type { User } from './types';

const SEED_FLAG_KEY = 'firestore_seeded_users';

const usersToSeed: User[] = [
    {
      "id": "usr_001",
      "nome": "Fernando Lei do Sino",
      "email": "fernando.lisboa@gmail.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_001"
    },
    {
      "id": "usr_002",
      "nome": "Paola Mora de Antônio",
      "email": "gina.sabede@diamond.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_002"
    },
    {
      "id": "usr_003",
      "nome": "Heloisa Silva Carvalho",
      "email": "heloisa.carvalho@email.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_003"
    },
    {
      "id": "usr_004",
      "nome": "João Guilherme Assis",
      "email": "joao.guilherme@adm.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_004"
    },
    {
      "id": "usr_005",
      "nome": "Labão Roberto de Alves",
      "email": "labao.alves@gmail.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_005"
    },
    {
      "id": "usr_006",
      "nome": "Lucas de Lima Araujo",
      "email": "lucas.lima03@gmail.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_006"
    },
    {
      "id": "usr_007",
      "nome": "Marcelo dos Anjos",
      "email": "marcelo.anjos@gmail.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_007"
    },
    {
      "id": "usr_008",
      "nome": "Nicolás de Souza Santos",
      "email": "nicolas.santos@gmail.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_008"
    },
    {
      "id": "usr_009",
      "nome": "Paulo Borges",
      "email": "borges.paulo05@gmail.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_009"
    },
    {
      "id": "usr_010",
      "nome": "Pedro Aério Dias de Meir",
      "email": "pedro.meireles05@gmail.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_010"
    },
    {
      "id": "usr_011",
      "nome": "Pedro Mesquita Clement",
      "email": "pedro.clementin60@gmail.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_011"
    },
    {
      "id": "usr_012",
      "nome": "Résia Mercedes Martins",
      "email": "mercedes.martins28@gmail.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_012"
    },
    {
      "id": "usr_013",
      "nome": "Buan Isleo da Silva Carvalho",
      "email": "buan.carvalho@gmail.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_013"
    },
    {
      "id": "usr_014",
      "nome": "Samuel Pereira",
      "email": "samuel.pereira@outlook.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_014"
    },
    {
      "id": "usr_015",
      "nome": "Vandenberg Araujo",
      "email": "vandenberg.araujo@gmail.com",
      "cargo": "Analista",
      "nivel": "Júnior",
      "status": "ativo",
      "telefone": "",
      "fotoUrl": "https://i.pravatar.cc/150?u=usr_015"
    }
  ];

// This function will seed the Firestore database with the users.
export async function seedUsers(db: Firestore) {
  // Check if seeding has already been done to avoid duplicate writes.
  if (sessionStorage.getItem(SEED_FLAG_KEY)) {
    return;
  }

  console.log('Starting to seed "users" collection...');
  const usersCollection = collection(db, 'users');
  
  // Use a batch to write all documents at once for efficiency.
  const batch = writeBatch(db);

  usersToSeed.forEach((user) => {
    const docRef = doc(usersCollection, user.id);
    batch.set(docRef, user);
  });

  try {
    await batch.commit();
    console.log('Successfully seeded "users" collection.');
    // Set a flag in session storage to indicate that seeding is complete for this session.
    sessionStorage.setItem(SEED_FLAG_KEY, 'true');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}
