"use client";
import { useState } from "react";

const SPARKLE_POSITIONS = [
  { x: -28, y: -20, delay: 0 },
  { x: 24, y: -24, delay: 60 },
  { x: -32, y: 8, delay: 120 },
  { x: 30, y: 4, delay: 40 },
  { x: -8, y: -34, delay: 100 },
  { x: 12, y: -32, delay: 160 },
  { x: -20, y: 22, delay: 200 },
  { x: 22, y: 20, delay: 80 },
];

export default function QuizCard({ question, index, total, onAnswered, onNext }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (i) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    onAnswered?.(i === question.bonneReponse);
  };

  const buttonClass = (i) => {
    const base =
      "w-full text-left rounded-xl px-4 py-3 border transition-all duration-200 font-serif text-[15px] leading-snug";
    if (!revealed) {
      return `${base} bg-white border-[#E8D9B5] text-[#3D2B1F] hover:border-gold hover:bg-[#FBF6EE] active:scale-[0.99]`;
    }
    const isCorrect = i === question.bonneReponse;
    const isPicked = i === selected;
    if (isCorrect) {
      return `${base} bg-[#EFF7EC] border-[#7BA968] text-[#2F4A23] font-semibold`;
    }
    if (isPicked) {
      return `${base} bg-[#FBEBEB] border-cardinal text-cardinal animate-quiz-shake`;
    }
    return `${base} bg-white border-[#E8D9B5] text-[#9C8A75] opacity-70`;
  };

  const isCorrectPicked = revealed && selected === question.bonneReponse;
  const isWrongPicked = revealed && selected !== question.bonneReponse;

  return (
    <div className="bg-[#FBF6EE] border border-[#E8D9B5] rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-bold tracking-widest uppercase text-gold">
          Question {index + 1} / {total}
        </p>
        <p className="text-[11px] font-medium text-[#8B6A3E]">{question.ref || ""}</p>
      </div>

      <h3 className="text-[17px] font-serif font-semibold text-brown mb-5 leading-snug">
        {question.enonce}
      </h3>

      <div className="space-y-2.5">
        {question.choix.map((c, i) => {
          const isCorrect = revealed && i === question.bonneReponse;
          const isPicked = revealed && i === selected;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              className={buttonClass(i)}
            >
              <span className="flex items-start gap-3">
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-[12px] font-bold mt-0.5 ${
                    isCorrect
                      ? "bg-[#7BA968] border-[#7BA968] text-white animate-quiz-pop"
                      : isPicked
                      ? "bg-cardinal border-cardinal text-white"
                      : "border-[#C9A84C] text-gold bg-white"
                  }`}
                >
                  {isCorrect ? "✓" : isPicked ? "✕" : String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{c}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Animation overlay : sparkles sur bonne réponse */}
      {isCorrectPicked && (
        <div className="relative h-0 pointer-events-none">
          <div className="absolute left-1/2 -top-4 -translate-x-1/2">
            {SPARKLE_POSITIONS.map((s, i) => (
              <span
                key={i}
                className="absolute block w-1.5 h-1.5 rounded-full bg-gold animate-quiz-sparkle"
                style={{
                  left: `${s.x}px`,
                  top: `${s.y}px`,
                  animationDelay: `${s.delay}ms`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bandeau feedback */}
      {revealed && (
        <div
          className={`mt-5 rounded-xl px-4 py-3 animate-quiz-fade-up ${
            isCorrectPicked
              ? "bg-[#EFF7EC] border border-[#7BA968]/40"
              : "bg-[#FBEBEB] border border-cardinal/30"
          }`}
        >
          <p
            className={`text-[12px] font-bold tracking-widest uppercase mb-1 ${
              isCorrectPicked ? "text-[#3F6A2F]" : "text-cardinal"
            }`}
          >
            {isCorrectPicked ? "Exact" : "Pas tout à fait"}
          </p>
          <p className="text-[14px] leading-relaxed text-[#3D2B1F] font-serif">
            {question.explication}
          </p>
        </div>
      )}

      {revealed && (
        <button
          onClick={onNext}
          className="mt-5 w-full bg-cardinal text-white font-semibold py-3 rounded-xl tracking-wide hover:bg-[#7A1616] transition-colors animate-quiz-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          {index + 1 === total ? "Voir mon score" : "Question suivante →"}
        </button>
      )}
    </div>
  );
}
