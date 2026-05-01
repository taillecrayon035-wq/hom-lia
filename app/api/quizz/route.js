import { NextResponse } from 'next/server';
import quizzLocaux from '../../../data/quizz-locaux.json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'date invalide' }, { status: 400 });
  }

  const entry = quizzLocaux[date];
  if (!entry) {
    return NextResponse.json({ error: 'Quiz non disponible' }, { status: 404 });
  }

  return NextResponse.json(entry);
}
