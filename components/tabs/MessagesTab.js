"use client";
import { useState } from "react";
import { MESSAGES } from "../../data/mockCommunity";

function Avatar({ initiales }) {
  return (
    <div className="w-9 h-9 rounded-full bg-cardinal flex items-center justify-center flex-shrink-0">
      <span className="text-white text-xs font-bold">{initiales}</span>
    </div>
  );
}

function MessageCard({ msg }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(msg.likes);

  function handleLike() {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  }

  return (
    <div className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-[#F0E6D3]">
      <div className="flex items-start gap-3">
        <Avatar initiales={msg.initiales} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-brown">{msg.auteur}</span>
            <span className="text-[11px] text-[#B09880]">{msg.date.slice(5).replace("-", "/")}</span>
          </div>
          <p className="text-[14px] leading-relaxed text-[#3D2B1F]">{msg.texte}</p>
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

export default function MessagesTab() {
  const [showCompose, setShowCompose] = useState(false);
  const [draft, setDraft] = useState("");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#E8D9B5] bg-white flex items-center justify-between">
        <h2 className="text-base font-bold text-brown">Messages de la communauté</h2>
        <button
          onClick={() => setShowCompose(!showCompose)}
          className="text-xs font-semibold text-white bg-cardinal px-3 py-1.5 rounded-full"
        >
          + Message
        </button>
      </div>

      {/* Compose */}
      {showCompose && (
        <div className="px-4 py-3 bg-[#FBF6EE] border-b border-[#E8D9B5]">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Partagez une pensée, un témoignage…"
            className="w-full bg-white border border-[#E8D9B5] rounded-xl px-4 py-3 text-sm text-brown resize-none focus:outline-none focus:border-cardinal"
            rows={3}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => { setShowCompose(false); setDraft(""); }}
              className="text-xs text-[#B09880] px-3 py-1.5"
            >
              Annuler
            </button>
            <button
              onClick={() => { setShowCompose(false); setDraft(""); }}
              className="text-xs font-semibold text-white bg-cardinal px-4 py-1.5 rounded-full disabled:opacity-50"
              disabled={!draft.trim()}
            >
              Publier
            </button>
          </div>
        </div>
      )}

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-4">
        {MESSAGES.map((msg) => (
          <MessageCard key={msg.id} msg={msg} />
        ))}
      </div>
    </div>
  );
}
