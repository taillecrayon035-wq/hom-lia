import { NextResponse } from 'next/server';
import lecturesLocales from '../../../data/lectures-locales.json';

function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&laquo;/g, '\u00ab')
    .replace(/&raquo;/g, '\u00bb')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'date invalide' }, { status: 400 });
  }

  // Données locales en priorité (demo / dates futures)
  const local = lecturesLocales[date];
  if (local) {
    return NextResponse.json({
      liturgie: local.liturgie || '',
      lecture: local.lecture || null,
      evangile: local.evangile || null,
      patristique: null,
    });
  }

  try {
    const [messeRes, lecturesRes] = await Promise.all([
      fetch(`https://api.aelf.org/v1/messes/${date}/france`, { next: { revalidate: 3600 } }),
      fetch(`https://api.aelf.org/v1/lectures/${date}/france`, { next: { revalidate: 3600 } }),
    ]);

    if (!messeRes.ok) {
      return NextResponse.json({ error: 'AELF non disponible' }, { status: 502 });
    }

    const messeData = await messeRes.json();
    const infos = messeData.informations;
    const messe = messeData.messes?.[0];

    if (!messe) {
      return NextResponse.json({ error: 'Aucune messe trouvée' }, { status: 404 });
    }

    const lectures = messe.lectures || [];
    const lecture1 = lectures.find(l => l.type === 'lecture_1');
    const evangile = lectures.find(l => l.type === 'evangile');

    let patristique = null;
    if (lecturesRes.ok) {
      const lecturesData = await lecturesRes.json();
      const lec = lecturesData.lectures;
      if (lec?.titre_patristique && lec?.texte_patristique) {
        patristique = {
          titre: stripHtml(lec.titre_patristique),
          texte: stripHtml(lec.texte_patristique),
        };
      }
    }

    return NextResponse.json({
      liturgie: infos?.jour_liturgique_nom || '',
      lecture: lecture1
        ? { ref: lecture1.ref, texte: stripHtml(lecture1.contenu || '') }
        : null,
      evangile: evangile
        ? { ref: evangile.ref, texte: stripHtml(evangile.contenu || '') }
        : null,
      patristique,
    });
  } catch {
    return NextResponse.json({ error: 'Erreur réseau' }, { status: 500 });
  }
}
