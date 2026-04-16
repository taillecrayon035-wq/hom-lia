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
  const entry = db[date];

  if (!entry) {
    return NextResponse.json({ error: 'Commentaire non disponible' }, { status: 404 });
  }

  // Nouveau format : { lecture: { sections }, evangile: { sections } }
  if (entry.lecture || entry.evangile) {
    return NextResponse.json({
      lecture: entry.lecture || null,
      evangile: entry.evangile || null,
    });
  }

  // Ancien format (rétrocompatibilité)
  return NextResponse.json({
    evangile: entry.sections ? { sections: entry.sections } : entry.commentaire,
    lecture: null,
  });
}
