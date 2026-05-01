"use client";
import { useState } from "react";

const HEART_BURST = [
  { x: -16, y: -22 },
  { x: 14, y: -24 },
  { x: -22, y: -8 },
  { x: 20, y: -10 },
  { x: 0, y: -28 },
];

function avatarBg(couleur) {
  if (couleur === "navy") return "bg-navy";
  if (couleur === "gold") return "bg-gold";
  return "bg-cardinal";
}

function Avatar({ initiales, couleur, size = "md" }) {
  const dim = size === "sm" ? "w-7 h-7 text-[10px]" : "w-10 h-10 text-xs";
  return (
    <div
      className={`${dim} rounded-full ${avatarBg(couleur)} flex items-center justify-center flex-shrink-0`}
    >
      <span className="text-white font-bold tracking-wide">{initiales}</span>
    </div>
  );
}

function CommentRow({ c }) {
  return (
    <div className="flex items-start gap-2.5 pt-3">
      <Avatar initiales={c.initiales} couleur={c.couleur} size="sm" />
      <div className="flex-1 min-w-0 bg-white border border-[#E8D9B5] rounded-xl px-3 py-2">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[12px] font-semibold text-brown">{c.auteur}</span>
          <span className="text-[10px] text-[#B09880]">{c.timeAgo}</span>
        </div>
        <p className="text-[13px] leading-snug text-[#3D2B1F] font-serif">{c.texte}</p>
      </div>
    </div>
  );
}

export default function PostCard({ post, onLike, onComment }) {
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState("");
  const [burst, setBurst] = useState(0);

  const handleLike = () => {
    if (!post.liked) setBurst((b) => b + 1);
    onLike();
  };

  const submit = () => {
    const t = draft.trim();
    if (!t) return;
    onComment(t);
    setDraft("");
  };

  return (
    <article className="bg-[#FBF6EE] border border-[#E8D9B5] rounded-2xl p-4 mb-3 shadow-sm">
      <header className="flex items-start gap-3 mb-3">
        <Avatar initiales={post.initiales} couleur={post.couleur} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-semibold text-brown">{post.auteur}</span>
            <span className="text-[11px] text-[#B09880]">{post.timeAgo}</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
            Évangile du jour
          </span>
        </div>
      </header>

      <p className="text-[15px] leading-relaxed text-[#3D2B1F] font-serif mb-3">
        {post.texte}
      </p>

      <div className="flex items-center gap-5 pt-2 border-t border-[#E8D9B5]/70">
        <button
          onClick={handleLike}
          className="relative flex items-center gap-1.5 text-sm font-medium transition-colors group"
        >
          <span className="relative">
            <svg
              viewBox="0 0 24 24"
              className={`w-5 h-5 transition-all duration-200 ${
                post.liked
                  ? "text-gold scale-110"
                  : "text-[#B09880] group-hover:text-gold"
              } ${post.liked ? "animate-quiz-pop" : ""}`}
              fill={post.liked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.83A4.5 4.5 0 0 1 19 11c0 5.65-7 10-7 10z" />
            </svg>
            {burst > 0 && (
              <span key={burst} className="absolute inset-0 pointer-events-none">
                {HEART_BURST.map((p, i) => (
                  <span
                    key={i}
                    className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-gold animate-quiz-sparkle"
                    style={{
                      "--sx": `${p.x}px`,
                      "--sy": `${p.y}px`,
                      animationDelay: `${i * 30}ms`,
                    }}
                  />
                ))}
              </span>
            )}
          </span>
          <span className={post.liked ? "text-gold font-semibold" : "text-[#8B6A3E]"}>
            {post.likes}
          </span>
        </button>

        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-1.5 text-sm font-medium text-[#8B6A3E] hover:text-cardinal transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-4.4A8 8 0 1 1 21 12z" />
          </svg>
          <span>{post.commentaires.length}</span>
        </button>
      </div>

      {expanded && (
        <div className="mt-3 pt-1 animate-quiz-fade-up">
          {post.commentaires.map((c) => (
            <CommentRow key={c.id} c={c} />
          ))}

          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E8D9B5]/70">
            <Avatar initiales="VO" couleur="navy" size="sm" />
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Ta réflexion…"
              className="flex-1 bg-white border border-[#E8D9B5] rounded-full px-3 py-1.5 text-[13px] font-serif placeholder:text-[#B09880] focus:outline-none focus:border-gold"
            />
            <button
              onClick={submit}
              disabled={!draft.trim()}
              className="text-[12px] font-bold tracking-wide uppercase text-cardinal disabled:text-[#C9A88E] disabled:cursor-not-allowed px-2"
            >
              Publier
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
