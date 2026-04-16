"use client";
import { useState } from "react";

export default function CommentaireCard({ sections, text, label }) {
  const [expanded, setExpanded] = useState(false);

  // Format sections : [{ titre, texte }]
  if (sections && sections.length > 0) {
    const fullText = sections.map(s => s.texte).join(" ");
    const isLong = fullText.length > 600;

    return (
      <div className="bg-[#FBF6EE] rounded-xl p-5 mb-4 border border-[#E8D9B5]">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm">📖</span>
          <p className="text-xs font-bold tracking-widest uppercase text-gold">
            {label || "Homélie"}
          </p>
        </div>

        <div className={isLong && !expanded ? "max-h-72 overflow-hidden relative" : ""}>
          {sections.map((section, i) => (
            <div key={i} className="mb-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-cardinal mb-2">
                {section.titre}
              </p>
              <p className="text-[15px] leading-relaxed text-[#3D2B1F] font-serif whitespace-pre-line">
                {section.texte}
              </p>
            </div>
          ))}
          {isLong && !expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FBF6EE] to-transparent" />
          )}
        </div>

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-sm font-semibold text-gold"
          >
            {expanded ? "Réduire ▲" : "Lire la suite ▼"}
          </button>
        )}
      </div>
    );
  }

  // Fallback format texte brut
  const preview = text && text.length > 320 ? text.slice(0, 320) + "…" : text;
  return (
    <div className="bg-[#FBF6EE] rounded-xl p-5 mb-4 border border-[#E8D9B5]">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm">📖</span>
        <p className="text-xs font-bold tracking-widest uppercase text-gold">
          {label || "Homélie"}
        </p>
      </div>
      <p className="text-[15px] leading-relaxed text-[#3D2B1F] font-serif whitespace-pre-line">
        {expanded ? text : preview}
      </p>
      {text && text.length > 320 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm font-semibold text-gold"
        >
          {expanded ? "Réduire ▲" : "Lire la suite ▼"}
        </button>
      )}
    </div>
  );
}
