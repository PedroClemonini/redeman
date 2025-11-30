
import { Pool } from 'pg';
import { registeredSites } from './registered-sites';
import users from '../../docs/data/users.json';

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'database',
  password: 'password',
  port: 5432,
});

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Seed Users
    for (const user of users) {
      await client.query(
        'INSERT INTO "User" (id, nome, email, cargo, nivel, certificacao, disponibilidade, modalidade, status, telefone, "fotoUrl") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
        [
          user.id,
          user.nome,
          user.email,
          user.cargo,
          user.nivel,
          user.certificacao,
          user.disponibilidade,
          user.modalidade,
          user.status,
          user.telefone,
          user.fotoUrl,
        ]
      );
    }

    // Seed Agencias
    for (const site of registeredSites) {
      await client.query(
        'INSERT INTO "Agencia" (id, codigo, nome, cidade, estado, endereco, qtd_switches, data_prevista, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [
          site.id || site.sigla,
          site.codigo,
          site.nome,
          site.cidade,
          site.estado,
          site.endereco,
          site.qtd_switches,
          site.data_prevista,
          site.status,
        ]
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error seeding database:', error);
  } finally {
    client.release();
  }
}

seed().then(() => {
  console.log('Finished seeding database.');
  pool.end();
});

