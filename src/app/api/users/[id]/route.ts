
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/postgres/db';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "User" WHERE id = $1', [params.id]);
    client.release();
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { nome, email, cargo, nivel, status, telefone, fotoUrl } = await req.json();
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE "User" SET nome = $1, email = $2, cargo = $3, nivel = $4, status = $5, telefone = $6, "fotoUrl" = $7 WHERE id = $8 RETURNING *',
      [nome, email, cargo, nivel, status, telefone, fotoUrl, params.id]
    );
    client.release();
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM "User" WHERE id = $1 RETURNING *', [params.id]);
    client.release();
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

