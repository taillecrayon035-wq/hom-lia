"use client";
import { useEffect, useState } from "react";
import PostCard from "../PostCard";

function Composer({ onPublish }) {
  const [draft, setDraft] = useState("");
  const submit = () => {
    const t = draft.trim();
    if (!t) return;
    onPublish(t);
    setDraft("");
  };
  return (
    <div className="bg-[#FBF6EE] border border-[#E8D9B5] rounded-2xl p-4 mb-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">VO</span>
        </div>
        <div className="flex-1 min-w-0">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Partage ce que cet évangile éveille en toi…"
            rows={2}
            className="w-full bg-white border border-[#E8D9B5] rounded-xl px-3 py-2 text-[14px] font-serif placeholder:text-[#B09880] focus:outline-none focus:border-gold resize-none"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={submit}
              disabled={!draft.trim()}
              className="bg-cardinal text-white text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full disabled:bg-[#D8C3A6] disabled:cursor-not-allowed hover:bg-[#7A1616] transition-colors"
            >
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FilTab({ date }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/fil?date=${date}`)
      .then((r) => r.json())
      .then((d) => setPosts(d.posts || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [date]);

  const toggleLike = (id) => {
    setPosts((ps) =>
      ps.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }
          : p
      )
    );
  };

  const addComment = (postId, texte) => {
    setPosts((ps) =>
      ps.map((p) =>
        p.id === postId
          ? {
              ...p,
              commentaires: [
                ...p.commentaires,
                {
                  id: `c-${Date.now()}`,
                  auteur: "Toi",
                  initiales: "VO",
                  couleur: "navy",
                  timeAgo: "à l'instant",
                  texte,
                },
              ],
            }
          : p
      )
    );
  };

  const publish = (texte) => {
    const newPost = {
      id: `p-${Date.now()}`,
      auteur: "Toi",
      initiales: "VO",
      couleur: "navy",
      timeAgo: "à l'instant",
      texte,
      likes: 0,
      liked: false,
      commentaires: [],
    };
    setPosts((ps) => [newPost, ...ps]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
        <Composer onPublish={publish} />

        {loading ? (
          <div className="text-center py-10">
            <p className="text-sm text-[#8B6A3E]">Chargement du fil…</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-sm text-[#8B6A3E]">Personne n'a encore partagé. Sois le premier.</p>
          </div>
        ) : (
          posts.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              onLike={() => toggleLike(p.id)}
              onComment={(t) => addComment(p.id, t)}
            />
          ))
        )}
      </div>
    </div>
  );
}
