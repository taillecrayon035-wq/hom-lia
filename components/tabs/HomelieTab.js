"use client";
import { useState, useEffect } from "react";
import { formatDateFR, today } from "../../data/mockData";
import CommentaireCard from "../CommentaireCard";

export default function HomelieTab({ date }) {
  const [commentaire, setCommentaire] = useState(null);
  const [loading, setLoading] = useState(true);
  const isToday = date === today();

  useEffect(() => {
    setLoading(true);
    setCommentaire(null);
    fetch(`/api/commentaire?date=${date}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setCommentaire(data.commentaire);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [date]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#E8D9B5] bg-white">
        <div className="text-center">
          <p className="text-sm font-semibold text-brown capitalize">
            {formatDateFR(date)}
          </p>
          {isToday && (
            <p className="text-[11px] uppercase tracking-wider text-cardinal font-medium mt-0.5">
              Aujourd'hui
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5 pb-4">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">✝</p>
            <p className="text-sm text-[#8B6A3E]">Chargement…</p>
          </div>
        ) : commentaire ? (
          <CommentaireCard
            label="Homélie"
            sections={commentaire.sections}
            text={typeof commentaire === "string" ? commentaire : null}
          />
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">✝</p>
            <p className="text-lg font-semibold text-brown mb-2">Pas d'homélie</p>
            <p className="text-sm text-[#8B6A3E]">
              L'homélie pour ce jour sera disponible prochainement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
