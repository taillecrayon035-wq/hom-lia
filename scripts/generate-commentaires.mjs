import Anthropic from '@anthropic-ai/sdk';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = join(__dirname, '..', 'data', 'commentaires.json');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const DATES = [
  '2026-04-10', '2026-04-11', '2026-04-12', '2026-04-13', '2026-04-14',
  '2026-04-15', '2026-04-16', '2026-04-17', '2026-04-18', '2026-04-19', '2026-04-20',
];

const SYSTEM_PROMPT = `Tu es un théologien catholique cultivé, qui écrit chaque jour un commentaire sur les lectures liturgiques du jour pour une application spirituelle.

Ton style :
- Profond théologiquement, ancré dans la Tradition (Pères de l'Église, grands théologiens, Écriture)
- Accessible : pas de jargon technique, mais une vraie densité de pensée
- Personnel et intérieur : tu parles au lecteur, tu l'invites à quelque chose de concret
- Sobre : pas de pathos, pas d'effusion sentimentale, pas de formules pieuses creuses
- Structure libre : tu pars d'un détail du texte, tu développes, tu conclus avec une question ou une invitation pour la journée
- Longueur : environ 350 mots

Voici trois exemples de commentaires dans ton style :

---
EXEMPLE 1 — Évangile de Jean, Caïphe

La prophétie involontaire de Caïphe est l'un des moments les plus saisissants de l'Évangile de Jean. Un homme qui cherche à éliminer Jésus devient, malgré lui, le porte-parole du dessein de Dieu. Jean nous le dit clairement : il ne parlait pas de lui-même.

C'est le paradoxe du mystère pascal : les forces qui s'opposent à Jésus servent, sans le savoir, le plan du salut. La mort qu'elles préparent est précisément celle qui donnera la vie. « Il vaut mieux qu'un seul homme meure pour le peuple » — Caïphe pense politique, mais dit théologie.

La lecture d'Ézéchiel éclaire tout cela : Dieu rassemble ce qui est dispersé. Un seul berger, une seule alliance, un seul peuple. L'évangile aujourd'hui montre comment ce rassemblement s'opère — non par la force, mais par le don total d'un seul.

Laissons-nous traverser par cette question : est-ce que je reconnais la main de Dieu dans ce qui me semble résistance ou obstacle ? Parfois ce qui s'oppose à nos plans devient, mystérieusement, le lieu même de la grâce.
---

EXEMPLE 2 — Dimanche des Rameaux, Passion selon Luc

Nous entrons dans la Semaine Sainte. Les Rameaux sont cette charnière étrange où l'on acclame et où l'on condamne dans le même souffle — parfois les mêmes personnes, souvent le même cœur.

La Passion selon Luc a une douceur particulière. Jusqu'au bout, Jésus guérit, pardonne, console. Il reçoit la violence sans la rendre. Isaïe l'avait annoncé : « J'ai présenté mon dos à ceux qui me frappaient. »

Ce n'est pas de la passivité. C'est une force d'un autre ordre — celle de quelqu'un qui sait où il va et qui choisit librement ce chemin. « J'ai désiré d'un grand désir manger cette Pâque avec vous. »

Il désire. Il veut être avec nous, même dans ce qui coûte. Non un Dieu qui subit, mais un Dieu qui désire — nous, notre compagnie, notre salut.
---

EXEMPLE 3 — Marie de Béthanie, parfum répandu

Marie de Béthanie fait quelque chose de disproportionné. Un parfum d'un an de salaire, répandu en un instant. L'odeur envahit toute la maison. C'est une image de l'amour vrai : il déborde, il ne calcule pas, il remplit l'espace.

Judas, lui, calcule. Il a raison sur le fond — les pauvres existent. Mais il a tort sur l'essentiel : il ne voit pas ce qui se passe. Il y a des moments qui ne se répèteront pas.

Quelle est ma posture devant Jésus ? Celle du calcul ou celle du parfum ? Les deux coexistent souvent en nous. La question n'est pas de se condamner, mais de remarquer.
---

Rédige maintenant le commentaire du jour dans ce même style.`;

function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&laquo;/g, '\u00ab')
    .replace(/&raquo;/g, '\u00bb')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function fetchAelf(date) {
  const [messeRes, lecturesRes] = await Promise.all([
    fetch(`https://api.aelf.org/v1/messes/${date}/france`),
    fetch(`https://api.aelf.org/v1/lectures/${date}/france`),
  ]);

  if (!messeRes.ok) throw new Error(`AELF messes ${date}: ${messeRes.status}`);

  const messeData = await messeRes.json();
  const messe = messeData.messes?.[0];
  const infos = messeData.informations;

  if (!messe) throw new Error(`Aucune messe pour ${date}`);

  const lectures = messe.lectures || [];
  const evangile = lectures.find(l => l.type === 'evangile');
  const lecture1 = lectures.find(l => l.type === 'lecture_1');

  let patristique = null;
  if (lecturesRes.ok) {
    const lecturesData = await lecturesRes.json();
    const lec = lecturesData.lectures;
    if (lec?.titre_patristique && lec?.texte_patristique) {
      patristique = stripHtml(lec.titre_patristique) + '\n' + stripHtml(lec.texte_patristique).slice(0, 600);
    }
  }

  return {
    liturgie: infos?.jour_liturgique_nom || date,
    lecture: lecture1 ? { ref: lecture1.ref, texte: stripHtml(lecture1.contenu || '') } : null,
    evangile: evangile ? { ref: evangile.ref, texte: stripHtml(evangile.contenu || '') } : null,
    patristique,
  };
}

async function generateCommentaire(date, aelf) {
  const { liturgie, lecture, evangile, patristique } = aelf;

  const userMessage = [
    `Liturgie : ${liturgie}`,
    lecture ? `\nLECTURE : ${lecture.ref}\n${lecture.texte}` : '',
    evangile ? `\nÉVANGILE : ${evangile.ref}\n${evangile.texte}` : '',
    patristique ? `\nLECTURE PATRISTIQUE (inspiration, ne pas citer directement) :\n${patristique}` : '',
    '\nÉcris le commentaire du jour.',
  ].join('');

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    thinking: { type: 'adaptive' },
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userMessage }],
  });

  return response.content.find(b => b.type === 'text')?.text || '';
}

async function main() {
  // Charger les commentaires existants si le fichier existe
  let commentaires = {};
  if (existsSync(OUTPUT_FILE)) {
    commentaires = JSON.parse(readFileSync(OUTPUT_FILE, 'utf-8'));
    console.log(`📖 ${Object.keys(commentaires).length} commentaire(s) existant(s) chargés`);
  }

  for (const date of DATES) {
    if (commentaires[date]) {
      console.log(`⏭  ${date} — déjà généré, ignoré`);
      continue;
    }

    process.stdout.write(`⏳ ${date} — récupération AELF...`);
    try {
      const aelf = await fetchAelf(date);
      process.stdout.write(` évangile: ${aelf.evangile?.ref || 'introuvable'} — génération Claude...`);

      const commentaire = await generateCommentaire(date, aelf);
      commentaires[date] = {
        liturgie: aelf.liturgie,
        commentaire,
        generatedAt: new Date().toISOString(),
      };

      // Sauvegarder après chaque génération
      writeFileSync(OUTPUT_FILE, JSON.stringify(commentaires, null, 2), 'utf-8');
      console.log(' ✅');
    } catch (err) {
      console.log(` ❌ ${err.message}`);
    }

    // Petite pause pour éviter le rate limiting
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n✅ Terminé. ${Object.keys(commentaires).length} commentaire(s) dans data/commentaires.json`);
}

main();
