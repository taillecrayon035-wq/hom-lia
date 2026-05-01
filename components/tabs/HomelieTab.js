"use client";
import { useState, useEffect } from "react";
import CommentaireCard from "../CommentaireCard";

export default function HomelieTab({ date }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setData(null);
    fetch(`/api/commentaire?date=${date}`)
      .then((r) => r.json())
      .then((d) => { if (!d.error) setData(d); })
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
        ) : data ? (
          <>
            {data.lecture && (
              <>
                <p className="text-xs font-bold tracking-widest uppercase text-cardinal mb-3">
                  Commentaire de la Lecture
                </p>
                <CommentaireCard label="Lecture" sections={data.lecture.sections} />
              </>
            )}
            {data.evangile && (
              <>
                <p className="text-xs font-bold tracking-widest uppercase text-navy mb-3 mt-6">
                  Commentaire de l'Évangile
                </p>
                <CommentaireCard label="Évangile" sections={data.evangile.sections} />
              </>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">✝</p>
            <p className="text-lg font-semibold text-brown mb-2">Pas d'homélie</p>
            <p className="text-sm text-[#8B6A3E]">L'homélie pour ce jour sera disponible prochainement.</p>
          </div>
        )}
      </div>
    </div>
  );
}
