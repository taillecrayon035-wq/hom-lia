"use client";
import { useState, useEffect } from "react";
import ReadingCard from "../ReadingCard";

export default function LecturesTab({ date }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setContent(null);
    fetch(`/api/messe?date=${date}`)
      .then((r) => r.json())
      .then((messe) => {
        if (!messe.error) setContent(messe);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [date]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">✝</p>
            <p className="text-sm text-[#8B6A3E]">Chargement…</p>
          </div>
        ) : content ? (
          <>
            <p className="text-xs font-semibold text-[#8B6A3E] uppercase tracking-wider mb-4">
              {content.liturgie}
            </p>
            {content.lecture && (
              <ReadingCard
                title="Lecture"
                reference={content.lecture.ref}
                text={content.lecture.texte}
                color="cardinal"
              />
            )}
            {content.evangile && (
              <ReadingCard
                title="Évangile"
                reference={content.evangile.ref}
                text={content.evangile.texte}
                color="navy"
              />
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">✝</p>
            <p className="text-lg font-semibold text-brown mb-2">Pas encore de contenu</p>
            <p className="text-sm text-[#8B6A3E]">
              Le contenu pour ce jour sera disponible prochainement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
