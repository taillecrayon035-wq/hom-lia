"use client";
import { useState } from "react";

const MOCK_POSTS = [
  {
    id: 1,
    type: "message",
    date: "5 avr.",
    texte: "Cette semaine sainte me touche particulièrement. La lecture sur le Serviteur souffrant me parle dans ce que je traverse.",
    likes: 12,
    vues: 134,
  },
  {
    id: 2,
    type: "commentaire",
    ref: "Jn 11, 45-57",
    typeRef: "Évangile",
    date: "4 avr.",
    texte: "Caïphe dit vrai sans le vouloir. Dieu peut parler à travers n'importe qui, même ceux qui lui sont opposés.",
    likes: 8,
    vues: 89,
  },
  {
    id: 3,
    type: "message",
    date: "3 avr.",
    texte: "La question posée en fin de commentaire — calcul ou parfum ? — je ne peux plus l'oublier.",
    likes: 15,
    vues: 201,
  },
  {
    id: 4,
    type: "commentaire",
    ref: "Is 42, 1-7",
    typeRef: "Lecture",
    date: "2 avr.",
    texte: "Il ne brisera pas le roseau qui se courbe. Une des images les plus belles de la Bible pour parler de la douceur de Dieu.",
    likes: 9,
    vues: 77,
  },
];

const REACH_STATS = [
  { label: "Vues totales", value: "501", icon: "👁" },
  { label: "Likes reçus", value: "44", icon: "♥" },
  { label: "Posts publiés", value: "13", icon: "✍️" },
  { label: "Taux d'engagement", value: "8.8%", icon: "📈" },
];

const SETTINGS = [
  { label: "Notifications", icon: "🔔", desc: "Rappels de lecture quotidiens" },
  { label: "Langue", icon: "🌐", desc: "Français" },
  { label: "Thème", icon: "🎨", desc: "Crème (défaut)" },
  { label: "Confidentialité", icon: "🔒", desc: "Profil public" },
  { label: "À propos", icon: "ℹ️", desc: "Version 0.1 — Beta" },
  { label: "Se déconnecter", icon: "🚪", desc: "", danger: true },
];

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const isComment = post.type === "commentaire";

  return (
    <div className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-[#F0E6D3]">
      {isComment && (
        <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full mb-2 bg-cardinal/10 text-cardinal">
          {post.typeRef} · {post.ref}
        </span>
      )}
      <p className={`text-[14px] leading-relaxed text-[#3D2B1F] ${isComment ? "font-serif italic" : ""}`}>
        {post.texte}
      </p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }}
            className={`flex items-center gap-1 text-xs font-medium ${liked ? "text-cardinal" : "text-[#B09880]"}`}
          >
            <span>{liked ? "♥" : "♡"}</span>
            <span>{likes}</span>
          </button>
          <span className="flex items-center gap-1 text-xs text-[#B09880]">
            <span>👁</span>
            <span>{post.vues}</span>
          </span>
        </div>
        <span className="text-[11px] text-[#B09880]">{post.date}</span>
      </div>
    </div>
  );
}

export default function ProfilTab() {
  const [tab, setTab] = useState("posts");

  const INNER_TABS = [
    { id: "posts", label: "Posts" },
    { id: "reach", label: "Stats" },
    { id: "settings", label: "Paramètres" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header profil style Twitter */}
      <div className="bg-white border-b border-[#E8D9B5]">
        {/* Bannière */}
        <div className="h-20 bg-gradient-to-r from-cardinal to-[#6B1010]" />

        <div className="px-5 pb-4">
          {/* Avatar + bouton follow */}
          <div className="flex items-end justify-between -mt-7 mb-3">
            <div className="w-14 h-14 rounded-full bg-cardinal border-4 border-white flex items-center justify-center">
              <span className="text-white text-xl font-bold">V</span>
            </div>
            <button className="text-xs font-semibold border border-cardinal text-cardinal px-4 py-1.5 rounded-full">
              Modifier
            </button>
          </div>

          {/* Nom & infos */}
          <p className="text-base font-bold text-brown leading-tight">Vous</p>
          <p className="text-xs text-[#8B6A3E] mb-3">Membre depuis avril 2026</p>

          {/* Abonnés / Abonnements */}
          <div className="flex gap-5">
            <button className="text-left">
              <span className="text-sm font-bold text-brown">124</span>
              <span className="text-xs text-[#8B6A3E] ml-1">abonnés</span>
            </button>
            <button className="text-left">
              <span className="text-sm font-bold text-brown">38</span>
              <span className="text-xs text-[#8B6A3E] ml-1">abonnements</span>
            </button>
          </div>
        </div>

        {/* Onglets internes */}
        <div className="flex border-t border-[#E8D9B5]">
          {INNER_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 text-xs font-semibold border-b-2 transition-colors ${
                tab === t.id
                  ? "border-cardinal text-cardinal"
                  : "border-transparent text-[#B09880]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-4">

        {/* Posts */}
        {tab === "posts" && (
          <>
            {MOCK_POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </>
        )}

        {/* Reach Stats */}
        {tab === "reach" && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {REACH_STATS.map((s) => (
                <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-[#F0E6D3] text-center">
                  <p className="text-2xl mb-1">{s.icon}</p>
                  <p className="text-2xl font-bold text-cardinal">{s.value}</p>
                  <p className="text-[11px] text-[#8B6A3E] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#F0E6D3] shadow-sm mb-3">
              <p className="text-xs font-bold tracking-widest uppercase text-gold mb-3">Meilleur post</p>
              <p className="text-[14px] leading-relaxed text-[#3D2B1F] italic font-serif mb-2">
                &ldquo;La question posée en fin de commentaire — calcul ou parfum ? — je ne peux plus l'oublier.&rdquo;
              </p>
              <div className="flex gap-4 text-xs text-[#B09880]">
                <span>♥ 15 likes</span>
                <span>👁 201 vues</span>
              </div>
            </div>

            <div className="bg-[#FBF6EE] rounded-xl p-4 border border-[#E8D9B5]">
              <p className="text-xs font-bold tracking-widest uppercase text-[#8B6A3E] mb-2">Activité — 7 derniers jours</p>
              <div className="flex items-end gap-1 h-16">
                {[3, 7, 2, 9, 5, 12, 8].map((v, i) => (
                  <div key={i} className="flex-1 bg-cardinal/20 rounded-t" style={{ height: `${(v / 12) * 100}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                  <span key={i} className="flex-1 text-center text-[9px] text-[#B09880]">{d}</span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Paramètres */}
        {tab === "settings" && (
          <div className="bg-white rounded-xl border border-[#F0E6D3] shadow-sm overflow-hidden">
            {SETTINGS.map((s, i) => (
              <button
                key={s.label}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-[#FBF6EE] transition-colors ${
                  i < SETTINGS.length - 1 ? "border-b border-[#F0E6D3]" : ""
                }`}
              >
                <span className="text-lg w-7 text-center">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${s.danger ? "text-red-600" : "text-brown"}`}>
                    {s.label}
                  </p>
                  {s.desc && <p className="text-xs text-[#8B6A3E]">{s.desc}</p>}
                </div>
                {!s.danger && (
                  <span className="text-[#B09880] text-sm">›</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
