import { NextResponse } from 'next/server';
import commentaires from '../../../data/commentaires.json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'date invalide' }, { status: 400 });
  }

  const entry = commentaires[date];

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

  // Ancien format
  return NextResponse.json({
    evangile: entry.sections ? { sections: entry.sections } : entry.commentaire,
    lecture: null,
  });
}
