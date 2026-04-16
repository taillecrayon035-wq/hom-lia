export const MESSAGES = [
  {
    id: 1,
    auteur: "Marie-Claire",
    initiales: "MC",
    date: "2026-04-05",
    texte: "Cette semaine sainte me touche particulièrement. La lecture d'aujourd'hui sur le Serviteur souffrant me parle tellement dans ce que je traverse en ce moment.",
    likes: 12,
  },
  {
    id: 2,
    auteur: "François",
    initiales: "FR",
    date: "2026-04-05",
    texte: "J'ai relu la Passion selon Luc ce matin. La douceur de Jésus jusqu'au bout — même l'oreille du serviteur. Ça m'a brisé.",
    likes: 8,
  },
  {
    id: 3,
    auteur: "Isabelle",
    initiales: "IB",
    date: "2026-04-04",
    texte: "Le commentaire d'hier sur Caïphe m'a ouvert les yeux. On parle tous théologie sans le savoir parfois.",
    likes: 15,
  },
  {
    id: 4,
    auteur: "Thomas",
    initiales: "TH",
    date: "2026-04-04",
    texte: "Merci pour ce travail. Je lis Homélia chaque matin avec mon café. Ça change vraiment la journée.",
    likes: 23,
  },
  {
    id: 5,
    auteur: "Anne-Sophie",
    initiales: "AS",
    date: "2026-04-03",
    texte: "La question posée en fin de commentaire — calcul ou parfum ? — je ne peux plus l'oublier. Elle m'accompagne.",
    likes: 19,
  },
];

export const COMMUNITY_COMMENTS = [
  {
    id: 1,
    auteur: "Pierre",
    initiales: "PI",
    date: "2026-04-05",
    lecture: "Is 50, 4-7",
    type: "lecture",
    texte: "« J'ai présenté mon dos à ceux qui me frappaient » — cette phrase me hante. Ce n'est pas de la résignation, c'est un choix libre. Isaïe anticipe quelque chose d'inouï.",
    likes: 9,
  },
  {
    id: 2,
    auteur: "Lucie",
    initiales: "LU",
    date: "2026-04-05",
    lecture: "Lc 22, 14 — 23, 56",
    type: "evangile",
    texte: "J'ai désiré d'un grand désir… Cette phrase de Jésus au début de la Passion m'a arrêtée. Il désire nous rejoindre, même dans la souffrance.",
    likes: 14,
  },
  {
    id: 3,
    auteur: "Jean-Baptiste",
    initiales: "JB",
    date: "2026-04-04",
    lecture: "Jn 11, 45-57",
    type: "evangile",
    texte: "Caïphe dit vrai sans le vouloir. Ça m'a rappelé que Dieu peut parler à travers n'importe qui, même ceux qui lui sont opposés.",
    likes: 11,
  },
  {
    id: 4,
    auteur: "Cécile",
    initiales: "CE",
    date: "2026-04-06",
    lecture: "Jn 12, 1-11",
    type: "evangile",
    texte: "Marie et son parfum. L'amour vrai est toujours excessif aux yeux du monde. Judas calcule, Marie aime. Je veux être Marie.",
    likes: 21,
  },
  {
    id: 5,
    auteur: "Mathieu",
    initiales: "MA",
    date: "2026-04-06",
    lecture: "Is 42, 1-7",
    type: "lecture",
    texte: "Il ne brisera pas le roseau qui se courbe. Une des images les plus belles de la Bible. Dieu ne casse pas ce qui est fragile.",
    likes: 17,
  },
];

export const PRIERES = {
  "2026-04-05": {
    liturgie: "Dimanche des Rameaux",
    laudes: {
      titre: "Laudes — Prière du matin",
      introduction: "Seigneur, ouvre mes lèvres, et ma bouche publiera ta louange.",
      psaume: {
        ref: "Ps 62",
        texte: `Dieu, tu es mon Dieu, je te cherche dès l'aube :
mon âme a soif de toi,
après toi languit ma chair,
terre aride, altérée, sans eau.

Je t'ai contemplé au sanctuaire,
j'ai vu ta force et ta gloire.
Ton amour vaut mieux que la vie ;
mes lèvres te chanteront.

Toute ma vie je vais te bénir,
en ton nom lever les mains.
Comme par un festin je serai rassasié ;
la joie sur les lèvres, je dirai ta louange.`,
      },
      intention: "Pour tous ceux qui entrent dans la Semaine Sainte, qu'ils puissent y trouver un renouveau de leur foi.",
      oraison: "Seigneur Jésus, tu es entré à Jérusalem dans l'humilité et la gloire. Apprends-nous à t'accueillir vraiment, non seulement avec des paroles, mais avec nos vies. Amen.",
    },
    vepres: {
      titre: "Vêpres — Prière du soir",
      introduction: "Que ma prière monte devant toi comme un encens.",
      psaume: {
        ref: "Ps 22",
        texte: `Mon Dieu, mon Dieu, pourquoi m'as-tu abandonné ?
Tu es loin de me secourir,
loin des mots que je rugis.

Mon Dieu, j'appelle le jour, tu ne réponds pas ;
la nuit, je n'ai point de repos.

Pourtant tu es le Saint,
toi qui siège sur les louanges d'Israël.
En toi nos pères espéraient,
ils espéraient et tu les délivrais.`,
      },
      intention: "Pour ceux qui souffrent en silence cette semaine, qu'ils sachent qu'ils ne sont pas abandonnés.",
      oraison: "Père, en ce soir des Rameaux, nous te confions nos peines et nos espérances. Que la Passion de ton Fils nous révèle la profondeur de ton amour. Amen.",
    },
    meditation: "En entrant dans la Semaine Sainte, laisse-toi traverser par une seule question : qu'est-ce que Jésus veut te donner cette semaine ? Pas ce que tu dois faire, mais ce qu'il veut offrir.",
  },
  "2026-04-04": {
    liturgie: "Samedi de la 5e semaine de Carême",
    laudes: {
      titre: "Laudes — Prière du matin",
      introduction: "Seigneur, ouvre mes lèvres, et ma bouche publiera ta louange.",
      psaume: {
        ref: "Ps 130",
        texte: `Du fond de l'abîme, je crie vers toi, Seigneur ;
Seigneur, écoute ma voix !
Que tes oreilles se fassent attentives
au cri de ma supplication !

Si tu retiens les fautes, Seigneur,
Seigneur, qui subsistera ?
Mais près de toi se trouve le pardon
pour que l'homme te craigne.

J'espère le Seigneur,
mon âme espère ;
j'attends sa parole.`,
      },
      intention: "Pour les catéchumènes qui se préparent à recevoir le baptême à Pâques.",
      oraison: "Seigneur, comme tu as rassemblé ton peuple dispersé, rassemble en nous ce qui est divisé. Que ce dernier samedi de Carême nous prépare à la joie de Pâques. Amen.",
    },
    vepres: {
      titre: "Vêpres — Prière du soir",
      introduction: "Que ma prière monte devant toi comme un encens.",
      psaume: {
        ref: "Ps 141",
        texte: `Seigneur, je t'appelle, viens vite !
Écoute ma voix quand je t'appelle.
Que ma prière monte devant toi comme un encens,
l'élévation de mes mains, comme le sacrifice du soir.`,
      },
      intention: "Pour ceux qui se préparent à fêter Pâques en famille.",
      oraison: "En ce soir, Père, nous te rendons grâce pour chaque jour de ce Carême. Que la veille pascale nous trouve prêts à accueillir la Résurrection. Amen.",
    },
    meditation: "Demain, tu entreras dans la Semaine Sainte. Ce soir, prends un moment pour te demander : qu'est-ce que ce Carême a changé en moi ?",
  },
  "2026-04-06": {
    liturgie: "Lundi Saint",
    laudes: {
      titre: "Laudes — Prière du matin",
      introduction: "Seigneur, ouvre mes lèvres, et ma bouche publiera ta louange.",
      psaume: {
        ref: "Ps 36",
        texte: `Ne t'irrite pas contre les méchants,
n'envie pas ceux qui font le mal :
comme l'herbe, vite ils se fanent,
ils tombent comme la fleur des champs.

Mets ta foi dans le Seigneur et fais le bien,
habite la terre et reste fidèle.
Fais du Seigneur ta seule joie :
il comblera les désirs de ton cœur.`,
      },
      intention: "Pour tous ceux qui vivent dans l'obscurité cette semaine, qu'ils trouvent la lumière du Christ.",
      oraison: "Seigneur, toi qui n'éteins pas la mèche qui faiblit, viens raviver en nous la flamme de ta présence. En ce Lundi Saint, garde-nous proches de toi. Amen.",
    },
    vepres: {
      titre: "Vêpres — Prière du soir",
      introduction: "Que ma prière monte devant toi comme un encens.",
      psaume: {
        ref: "Ps 27",
        texte: `Le Seigneur est ma lumière et mon salut ;
de qui aurais-je crainte ?
Le Seigneur est le rempart de ma vie ;
devant qui tremblerai-je ?

Une chose, je l'ai demandée au Seigneur,
la seule que je cherche :
habiter la maison du Seigneur
tous les jours de ma vie.`,
      },
      intention: "Pour ceux qui accompagnent un mourant, que la paix du Christ les soutienne.",
      oraison: "Père, en ce soir du Lundi Saint, nous méditons le geste de Marie et son parfum répandu. Apprends-nous la générosité sans calcul, l'amour sans mesure. Amen.",
    },
    meditation: "Marie n'a pas regardé le prix. Elle a regardé Jésus. Ce soir, qu'est-ce qui t'empêche de te donner sans compter ?",
  },
};
