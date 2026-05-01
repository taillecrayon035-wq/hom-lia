"use client";
import { useEffect, useMemo, useState } from "react";
import QuizCard from "../QuizCard";

const CONFETTI_COLORS = ["#C9A84C", "#8B1A1A", "#1A4A8B", "#7BA968", "#E8D9B5"];

function Confetti({ count = 36 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: Math.random() * 100,
        cx: (Math.random() - 0.5) * 80,
        delay: Math.random() * 600,
        duration: 1800 + Math.random() * 900,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 6 + Math.random() * 6,
        rounded: Math.random() > 0.5,
      })),
    [count]
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 animate-quiz-confetti"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.rounded ? "9999px" : "2px",
            animationDelay: `${p.delay}ms`,
            animationDuration: `${p.duration}ms`,
            "--cx": `${p.cx}px`,
          }}
        />
      ))}
    </div>
  );
}

function ProgressBar({ current, total }) {
  return (
    <div className="flex gap-1.5 px-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
            i < current ? "bg-gold" : "bg-[#E8D9B5]"
          }`}
        />
      ))}
    </div>
  );
}

function ScoreScreen({ score, total, onRestart, conclusion }) {
  const perfect = score === total;
  const good = score >= Math.ceil(total * 0.75);
  const message = perfect
    ? "Sans faute. Tu as saisi le cœur du passage."
    : good
    ? "Très bien. L'évangile commence à parler."
    : score >= total / 2
    ? "Pas mal — relis le commentaire pour aller plus loin."
    : "Reviens-y : la lecture éclaire les questions.";

  return (
    <div className="relative">
      {perfect && <Confetti />}
      <div className="relative z-10 text-center pt-4 animate-quiz-fade-up">
        <p className="text-[11px] font-bold tracking-widest uppercase text-gold mb-2">
          Évangile en 1 minute
        </p>
        <p className="text-5xl font-serif font-bold text-cardinal mb-1">
          {score}<span className="text-[#C9A84C]">/{total}</span>
        </p>
        <p className="text-sm text-[#8B6A3E] mb-6">{message}</p>

        {conclusion && (
          <div className="bg-[#FBF6EE] border border-[#E8D9B5] rounded-2xl p-5 text-left mb-5">
            <p className="text-[11px] font-bold tracking-widest uppercase text-cardinal mb-2">
              {conclusion.titre}
            </p>
            <p className="text-[15px] leading-relaxed text-[#3D2B1F] font-serif">
              {conclusion.texte}
            </p>
          </div>
        )}

        <button
          onClick={onRestart}
          className="w-full bg-cardinal text-white font-semibold py-3 rounded-xl tracking-wide hover:bg-[#7A1616] transition-colors"
        >
          Recommencer le quiz
        </button>
      </div>
    </div>
  );
}

export default function QuizzTab({ date }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setStep(0);
    setScore(0);
    setDone(false);
    fetch(`/api/quizz?date=${date}`)
      .then((r) => r.json())
      .then((d) => { if (!d.error) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [date]);

  const restart = () => {
    setStep(0);
    setScore(0);
    setDone(false);
  };

  const total = data?.questions?.length || 0;
  const current = data?.questions?.[step];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">✝</p>
            <p className="text-sm text-[#8B6A3E]">Chargement…</p>
          </div>
        ) : !data ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">✝</p>
            <p className="text-lg font-semibold text-brown mb-2">Pas encore de quiz</p>
            <p className="text-sm text-[#8B6A3E]">
              Le quiz pour ce jour sera disponible prochainement.
            </p>
          </div>
        ) : done ? (
          <ScoreScreen
            score={score}
            total={total}
            conclusion={data.conclusion}
            onRestart={restart}
          />
        ) : (
          <>
            <div className="mb-5">
              <p className="text-[11px] font-bold tracking-widest uppercase text-gold mb-1">
                {data.titre || "Quiz du jour"}
              </p>
              <p className="text-[13px] text-[#8B6A3E] mb-4 leading-relaxed">
                {data.intro}
              </p>
              <ProgressBar current={step} total={total} />
            </div>

            {current && (
              <QuizCard
                key={current.id}
                question={{ ...current, ref: data.ref }}
                index={step}
                total={total}
                onAnswered={(ok) => { if (ok) setScore((s) => s + 1); }}
                onNext={() => {
                  if (step + 1 >= total) setDone(true);
                  else setStep(step + 1);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
