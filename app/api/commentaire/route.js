import { NextResponse } from 'next/server';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const DB_FILE = join(process.cwd(), 'data', 'commentaires.json');

function loadDb() {
  if (!existsSync(DB_FILE)) return {};
  return JSON.parse(readFileSync(DB_FILE, 'utf-8'));
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'date invalide' }, { status: 400 });
  }

  const db = loadDb();

  if (db[date]) {
    return NextResponse.json({
      commentaire: db[date].sections
        ? { sections: db[date].sections }
        : db[date].commentaire,
    });
  }

  return NextResponse.json({ error: 'Commentaire non disponible' }, { status: 404 });
}
