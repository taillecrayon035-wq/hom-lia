"use client";
import { useState } from "react";

export default function ReadingCard({ title, reference, text, color }) {
  const [expanded, setExpanded] = useState(false);
  const preview = text.length > 300 ? text.slice(0, 300) + "…" : text;

  const borderColor = color === "cardinal" ? "border-cardinal" : "border-navy";
  const titleColor = color === "cardinal" ? "text-cardinal" : "text-navy";

  return (
    <div className={`bg-white rounded-xl p-5 mb-4 border-l-4 shadow-sm ${borderColor}`}>
      <div className="mb-3">
        <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${titleColor}`}>
          {title}
        </p>
        <p className="text-base font-semibold text-brown">{reference}</p>
      </div>

      <p className="text-[15px] leading-relaxed text-[#3D2B1F] font-serif whitespace-pre-line">
        {expanded ? text : preview}
      </p>

      {text.length > 300 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className={`mt-3 text-sm font-semibold ${titleColor}`}
        >
          {expanded ? "Réduire ▲" : "Lire la suite ▼"}
        </button>
      )}
    </div>
  );
}
