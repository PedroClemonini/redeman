
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/postgres/db';

export async function GET(req: NextRequest) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "User"');
    client.release();
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { nome, email, cargo, nivel, status, telefone, fotoUrl } = await req.json();
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO "User" (nome, email, cargo, nivel, status, telefone, "fotoUrl") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nome, email, cargo, nivel, status, telefone, fotoUrl]
    );
    client.release();
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

