"use client";
import { useState } from "react";
import { PRIERES } from "../../data/mockCommunity";
import { today, formatDateFR, addDays } from "../../data/mockData";

function PriereSection({ section }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl mb-3 shadow-sm border border-[#F0E6D3] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-bold text-brown">{section.titre}</span>
        <span className="text-cardinal text-lg">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-[#F0E6D3]">
          <p className="text-xs text-[#8B6A3E] italic mt-4 mb-4">{section.introduction}</p>

          <div className="mb-4">
            <p className="text-xs font-bold tracking-widest uppercase text-gold mb-2">{section.psaume.ref}</p>
            <p className="text-[14px] leading-relaxed text-[#3D2B1F] font-serif italic whitespace-pre-line">
              {section.psaume.texte}
            </p>
          </div>

          <div className="bg-[#FBF6EE] rounded-lg px-4 py-3 mb-4 border border-[#E8D9B5]">
            <p className="text-xs font-bold tracking-widest uppercase text-cardinal mb-1">Intention</p>
            <p className="text-[13px] leading-relaxed text-[#3D2B1F]">{section.intention}</p>
          </div>

          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-navy mb-1">Oraison</p>
            <p className="text-[14px] leading-relaxed text-[#3D2B1F] font-serif">{section.oraison}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PrieresTab() {
  const [date, setDate] = useState("2026-04-05");
  const prieres = PRIERES[date];
  const isToday = date === today();

  return (
    <div className="flex flex-col h-full">
      {/* Date Navigator */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#E8D9B5] bg-white">
        <button
          onClick={() => setDate(addDays(date, -1))}
          className="text-3xl text-cardinal px-2 leading-none hover:opacity-70"
        >
          ‹
        </button>
        <div className="text-center">
          <p className="text-sm font-semibold text-brown capitalize">{formatDateFR(date)}</p>
          {isToday && (
            <p className="text-[11px] uppercase tracking-wider text-cardinal font-medium mt-0.5">
              Aujourd'hui
            </p>
          )}
        </div>
        <button
          onClick={() => setDate(addDays(date, 1))}
          className="text-3xl text-cardinal px-2 leading-none hover:opacity-70"
        >
          ›
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5 pb-4">
        {prieres ? (
          <>
            <p className="text-xs font-semibold text-[#8B6A3E] uppercase tracking-wider mb-4">
              {prieres.liturgie}
            </p>

            <PriereSection section={prieres.laudes} />
            <PriereSection section={prieres.vepres} />

            <div className="bg-[#FBF6EE] rounded-xl p-5 border border-[#E8D9B5] mt-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm">✦</span>
                <p className="text-xs font-bold tracking-widest uppercase text-gold">
                  Méditation du jour
                </p>
              </div>
              <p className="text-[15px] leading-relaxed text-[#3D2B1F] font-serif italic">
                {prieres.meditation}
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">✝</p>
            <p className="text-lg font-semibold text-brown mb-2">Pas encore de prières</p>
            <p className="text-sm text-[#8B6A3E]">Les prières pour ce jour seront disponibles prochainement.</p>
          </div>
        )}
      </div>
    </div>
  );
}
