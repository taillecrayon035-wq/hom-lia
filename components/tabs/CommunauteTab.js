"use client";
import { useState } from "react";
import { COMMUNITY_COMMENTS } from "../../data/mockCommunity";

function Avatar({ initiales, color }) {
  const bg = color === "navy" ? "bg-navy" : "bg-cardinal";
  return (
    <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}>
      <span className="text-white text-xs font-bold">{initiales}</span>
    </div>
  );
}

function CommentCard({ comment }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);
  const isEvangile = comment.type === "evangile";

  function handleLike() {
    if (!liked) { setLikes(likes + 1); setLiked(true); }
    else { setLikes(likes - 1); setLiked(false); }
  }

  return (
    <div className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-[#F0E6D3]">
      <div className="flex items-start gap-3">
        <Avatar initiales={comment.initiales} color={isEvangile ? "navy" : "cardinal"} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-brown">{comment.auteur}</span>
            <span className="text-[11px] text-[#B09880]">{comment.date.slice(5).replace("-", "/")}</span>
          </div>
          <span className={`inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full mb-2 ${
            isEvangile ? "bg-navy/10 text-navy" : "bg-cardinal/10 text-cardinal"
          }`}>
            {isEvangile ? "Évangile" : "Lecture"} · {comment.lecture}
          </span>
          <p className="text-[14px] leading-relaxed text-[#3D2B1F] font-serif italic">
            &ldquo;{comment.texte}&rdquo;
          </p>
          <button
            onClick={handleLike}
            className={`mt-2 flex items-center gap-1 text-xs font-medium transition-colors ${liked ? "text-cardinal" : "text-[#B09880]"}`}
          >
            <span>{liked ? "♥" : "♡"}</span>
            <span>{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CommunauteTab() {
  const [filter, setFilter] = useState("tous");

  const filtered = filter === "tous"
    ? COMMUNITY_COMMENTS
    : COMMUNITY_COMMENTS.filter((c) => c.type === filter);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#E8D9B5] bg-white">
        <h2 className="text-base font-bold text-brown mb-2">Commentaires de la communauté</h2>
        <div className="flex gap-2">
          {[
            { id: "tous", label: "Tous" },
            { id: "lecture", label: "Lectures" },
            { id: "evangile", label: "Évangiles" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
                filter === f.id
                  ? "bg-cardinal text-white border-cardinal"
                  : "bg-white text-[#8B6A3E] border-[#E8D9B5]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-4">
        {filtered.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
