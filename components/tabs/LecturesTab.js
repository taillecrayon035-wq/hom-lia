"use client";
import { useState, useEffect } from "react";
import { formatDateFR, addDays, today } from "../../data/mockData";
import ReadingCard from "../ReadingCard";

export default function LecturesTab({ date, onDateChange }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const isToday = date === today();

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
      {/* Date Navigator */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#E8D9B5] bg-white">
        <button
          onClick={() => onDateChange(addDays(date, -1))}
          className="text-3xl text-cardinal px-2 leading-none hover:opacity-70"
        >
          ‹
        </button>
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
        <button
          onClick={() => onDateChange(addDays(date, 1))}
          className="text-3xl text-cardinal px-2 leading-none hover:opacity-70"
        >
          ›
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5 pb-4">
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
