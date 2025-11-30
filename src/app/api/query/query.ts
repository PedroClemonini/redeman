
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/postgres/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { query, params } = req.body;

    try {
      const result = await pool.query(query, params);
      res.status(200).json({ data: result.rows });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

