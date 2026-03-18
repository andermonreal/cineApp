// scripts/seed.mjs
// Run with: node scripts/seed.mjs
// Requires Node >= 18 and firebase package installed
// Lee la config desde .env.local en la raíz del proyecto (sin dependencias extra)

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ── Leer y parsear .env.local ─────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env.local');

if (!existsSync(envPath)) {
  console.error('\n❌  No se encontró .env.local en la raíz del proyecto.');
  console.error(`    Ruta buscada: ${envPath}\n`);
  process.exit(1);
}

const parseEnv = (filePath) => {
  const lines = readFileSync(filePath, 'utf-8').split('\n');
  const env = {};
  for (const line of lines) {
    const trimmed = line.trim();
    // Ignorar comentarios y líneas vacías
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, '');
    env[key] = value;
  }
  return env;
};

const env = parseEnv(envPath);

const required = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID',
];

const missing = required.filter((k) => !env[k]);
if (missing.length > 0) {
  console.error('\n❌  Faltan variables en .env.local:');
  missing.forEach((k) => console.error(`    - ${k}`));
  console.error('');
  process.exit(1);
}

const FIREBASE_CONFIG = {
  apiKey: env.REACT_APP_FIREBASE_API_KEY,
  authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.REACT_APP_FIREBASE_APP_ID,
};
// ─────────────────────────────────────────────────────────────

console.log(`\n🔑  Proyecto: ${FIREBASE_CONFIG.projectId}`);

const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);

const MOVIES = [
  {
    id: 'movie-076',
    title: 'Joker',
    year: '2019',
    genre: 'Drama / Crimen',
    director: 'Todd Phillips',
    synopsis: 'Un comediante fracasado se transforma en el icónico villano Joker.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYjYzZWM4ZTQtNzA1Yi00NzQ2LTk3OTktODNjN2Q3NzY0ODI2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    duration: '122 min',
    cast: ['Joaquin Phoenix'],
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: 'movie-077',
    title: 'Logan',
    year: '2017',
    genre: 'Acción / Drama',
    director: 'James Mangold',
    synopsis: 'Un envejecido Wolverine protege a una joven mutante.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjE1MDk0Mjc1MF5BMl5BanBnXkFtZTgwMTg0OTIyMDI@._V1_SX300.jpg',
    duration: '137 min',
    cast: ['Hugh Jackman'],
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: 'movie-078',
    title: 'Gladiator',
    year: '2000',
    genre: 'Acción / Drama',
    director: 'Ridley Scott',
    synopsis: 'Un general romano busca venganza tras la muerte de su familia.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNTc2MjE4MzE4NF5BMl5BanBnXkFtZTcwMDc4Njk3OA@@._V1_SX300.jpg',
    duration: '155 min',
    cast: ['Russell Crowe'],
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: 'movie-079',
    title: 'Mad Max: Fury Road',
    year: '2015',
    genre: 'Acción / Aventura',
    director: 'George Miller',
    synopsis: 'Una persecución postapocalíptica a través del desierto.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTk3NjQ5MTY4OV5BMl5BanBnXkFtZTgwNjY2NjA3NTE@._V1_SX300.jpg',
    duration: '120 min',
    cast: ['Tom Hardy', 'Charlize Theron'],
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: 'movie-080',
    title: 'La La Land',
    year: '2016',
    genre: 'Romance / Musical',
    director: 'Damien Chazelle',
    synopsis: 'Una actriz y un músico persiguen sus sueños en Los Ángeles.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjA0NzQ5NjA3NF5BMl5BanBnXkFtZTgwNDk4OTQ2MDI@._V1_SX300.jpg',
    duration: '128 min',
    cast: ['Ryan Gosling', 'Emma Stone'],
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: 'movie-081',
    title: 'Whiplash',
    year: '2014',
    genre: 'Drama / Música',
    director: 'Damien Chazelle',
    synopsis: 'Un joven baterista lucha por alcanzar la perfección.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjA5NTk4NjU0NF5BMl5BanBnXkFtZTgwODUxNTg3MjE@._V1_SX300.jpg',
    duration: '106 min',
    cast: ['Miles Teller', 'J.K. Simmons'],
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: 'movie-082',
    title: 'Birdman',
    year: '2014',
    genre: 'Comedia / Drama',
    director: 'Alejandro G. Iñárritu',
    synopsis: 'Un actor intenta recuperar su fama en Broadway.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTUxNTcxNjUzMV5BMl5BanBnXkFtZTgwMDMxNjM3MzE@._V1_SX300.jpg',
    duration: '119 min',
    cast: ['Michael Keaton'],
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: 'movie-083',
    title: 'El Renacido',
    year: '2015',
    genre: 'Aventura / Drama',
    director: 'Alejandro G. Iñárritu',
    synopsis: 'Un cazador sobrevive tras ser atacado por un oso.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYzQ3ODI3ZTktYzYyOC00ZTQ0LTk5ZTQtOTQ0ZjQ3NjZhNzEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    duration: '156 min',
    cast: ['Leonardo DiCaprio'],
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: 'movie-084',
    title: 'El Gran Showman',
    year: '2017',
    genre: 'Musical / Drama',
    director: 'Michael Gracey',
    synopsis: 'La historia del showman P.T. Barnum.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZGE2ZTc0NzItYjM1Yi00NDMwLWExNjItNDc3ZTZkZGY5NmJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    duration: '105 min',
    cast: ['Hugh Jackman'],
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: 'movie-085',
    title: 'Shutter Island',
    year: '2010',
    genre: 'Thriller / Misterio',
    director: 'Martin Scorsese',
    synopsis: 'Un agente investiga la desaparición de una paciente psiquiátrica.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BM2YxY2QxYjEtZjY3Ni00M2Q4LWE5NjEtZTU1ZjNjNzU0ZTJhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    duration: '138 min',
    cast: ['Leonardo DiCaprio'],
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: 'movie-086',
    title: 'The Revenant',
    year: '2015',
    genre: 'Drama / Aventura',
    director: 'Alejandro G. Iñárritu',
    synopsis: 'Un hombre lucha por sobrevivir en la naturaleza salvaje.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BYzQ3ODI3ZTktYzYyOC00ZTQ0LTk5ZTQtOTQ0ZjQ3NjZhNzEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
    duration: '156 min',
    cast: ['Leonardo DiCaprio'],
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: 'movie-087',
    title: 'Avatar',
    year: '2009',
    genre: 'Ciencia Ficción / Aventura',
    director: 'James Cameron',
    synopsis: 'Un marine se integra en el mundo de Pandora.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjA5NTk4NjU0NF5BMl5BanBnXkFtZTcwODc5NzYxMw@@._V1_SX300.jpg',
    duration: '162 min',
    cast: ['Sam Worthington'],
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: 'movie-088',
    title: 'Avatar: El Camino del Agua',
    year: '2022',
    genre: 'Ciencia Ficción / Aventura',
    director: 'James Cameron',
    synopsis: 'Jake Sully protege a su familia en Pandora.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNDYyNzU1YjUtYjQ5ZS00NzY5LWI5MjctMTU2ZDNlYTI4YzU2XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    duration: '192 min',
    cast: ['Sam Worthington'],
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: 'movie-089',
    title: 'The Prestige',
    year: '2006',
    genre: 'Drama / Misterio',
    director: 'Christopher Nolan',
    synopsis: 'Dos magos compiten obsesivamente.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjA5NzI1ODgyNV5BMl5BanBnXkFtZTcwNjYzMzY2Mw@@._V1_SX300.jpg',
    duration: '130 min',
    cast: ['Hugh Jackman', 'Christian Bale'],
    averageRating: 0,
    totalRatings: 0,
  },
  {
    id: 'movie-090',
    title: 'Memento',
    year: '2000',
    genre: 'Thriller / Misterio',
    director: 'Christopher Nolan',
    synopsis: 'Un hombre con amnesia busca al asesino de su esposa.',
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjA5NzU3Mjk2MF5BMl5BanBnXkFtZTcwMDU3MjY3Mw@@._V1_SX300.jpg',
    duration: '113 min',
    cast: ['Guy Pearce'],
    averageRating: 0,
    totalRatings: 0,
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Carga en memoria todos los datos existentes de una sola consulta
const loadExistingMovies = async () => {
  const snapshot = await getDocs(collection(db, 'movies'));
  const byId = new Set();   // Check 1: ID de documento
  const byTitle = new Set();   // Check 2: título normalizado
  const byTitleYear = new Set();   // Check 3: título + año (detecta remakes)

  snapshot.forEach((docSnap) => {
    const { title, year } = docSnap.data();
    byId.add(docSnap.id);
    if (title) {
      byTitle.add(title.toLowerCase().trim());
      byTitleYear.add(`${title.toLowerCase().trim()}__${year}`);
    }
  });

  return { byId, byTitle, byTitleYear };
};

const run = async () => {
  console.log('\n🎬  CineApp — Seed de películas');
  console.log(`📦  Total a procesar: ${MOVIES.length} películas`);
  console.log('🔍  Consultando Firestore...\n');

  const { byId, byTitle, byTitleYear } = await loadExistingMovies();

  console.log(`📂  Películas ya en BD: ${byId.size}`);
  console.log('─'.repeat(60));

  let created = 0, skipped = 0, errors = 0;

  for (const movie of MOVIES) {
    const { id, ...data } = movie;
    const label = movie.title.padEnd(45);
    const titleKey = movie.title.toLowerCase().trim();
    const titleYearKey = `${titleKey}__${movie.year}`;

    try {
      // ── Comprobación 1: ID de documento ──────────────────────
      if (byId.has(id)) {
        console.log(`  ⏭  ${label} (ID duplicado: ${id})`);
        skipped++;
        continue;
      }

      // ── Comprobación 2: Título exacto ─────────────────────────
      if (byTitle.has(titleKey)) {
        console.log(`  ⏭  ${label} (título ya existe)`);
        skipped++;
        continue;
      }

      // ── Comprobación 3: Título + Año (remakes) ────────────────
      if (byTitleYear.has(titleYearKey)) {
        console.log(`  ⏭  ${label} (mismo título y año: ${movie.year})`);
        skipped++;
        continue;
      }

      // ── Sin duplicados: crear ─────────────────────────────────
      const ref = doc(collection(db, 'movies'), id);
      await setDoc(ref, { ...data, averageRating: 0, totalRatings: 0 });

      // Actualizar los sets para detectar duplicados dentro del propio array MOVIES
      byId.add(id);
      byTitle.add(titleKey);
      byTitleYear.add(titleYearKey);

      console.log(`  ✅  ${label}`);
      created++;

    } catch (err) {
      console.log(`  ❌  ${label} → ${err.message}`);
      errors++;
    }

    await sleep(250);
  }

  console.log('─'.repeat(60));
  console.log(`  ✅  Creadas:  ${created}`);
  console.log(`  ⏭  Omitidas: ${skipped}  (por ID, título o título+año duplicado)`);
  console.log(`  ❌  Errores:  ${errors}`);
  console.log('\n  ¡Listo! Restaura las reglas de Firestore.\n');
  process.exit(0);
};

run().catch((err) => {
  console.error('\n❌  Error fatal:', err.message);
  process.exit(1);
});
