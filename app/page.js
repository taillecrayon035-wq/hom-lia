"use client";
import { useState } from "react";

export default function WaitingList() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Une erreur est survenue.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Impossible de se connecter. Réessaie plus tard.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      {/* Ornement haut */}
      <div className="flex items-center gap-3 mb-10">
        <div className="h-px w-12 bg-gold opacity-60" />
        <span className="text-gold text-lg">✦</span>
        <div className="h-px w-12 bg-gold opacity-60" />
      </div>

      {/* Logo & titre */}
      <div className="text-center mb-4">
        <h1
          className="font-serif text-6xl text-cardinal tracking-wide"
          style={{ letterSpacing: "0.08em" }}
        >
          Homélia
        </h1>
        <div className="h-px w-24 bg-gold mx-auto mt-4 mb-5 opacity-70" />
        <p className="font-serif text-brown text-lg leading-relaxed max-w-sm mx-auto opacity-80">
          Chaque jour, un commentaire catholique approfondi
          <br />
          sur les lectures et l'évangile du jour.
        </p>
      </div>

      {/* Badge lancement */}
      <div className="mb-10 mt-6 inline-flex items-center gap-2 bg-cardinal/10 border border-cardinal/20 rounded-full px-4 py-1.5">
        <span className="w-2 h-2 rounded-full bg-cardinal animate-pulse" />
        <span className="text-cardinal text-sm font-serif tracking-wide">
          Lancement bientôt
        </span>
      </div>

      {/* Formulaire */}
      {status !== "success" ? (
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <p className="text-center text-brown/70 text-sm font-serif mb-5">
            Laisse ton email pour être averti en premier.
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.fr"
              required
              disabled={status === "loading"}
              className="w-full px-4 py-3 rounded-lg border border-gold/40 bg-white/60 text-brown font-serif placeholder:text-brown/40 focus:outline-none focus:border-cardinal/50 focus:ring-2 focus:ring-cardinal/10 disabled:opacity-50 transition"
            />
            <button
              type="submit"
              disabled={status === "loading" || !email}
              className="w-full py-3 rounded-lg bg-cardinal text-cream font-serif text-base tracking-wide hover:bg-cardinal/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {status === "loading" ? "Inscription…" : "Me prévenir"}
            </button>
          </div>

          {status === "error" && (
            <p className="mt-3 text-center text-sm text-red-700 font-serif">
              {errorMsg}
            </p>
          )}
        </form>
      ) : (
        /* État succès */
        <div className="w-full max-w-sm text-center">
          <div className="text-4xl mb-4">✦</div>
          <h2 className="font-serif text-cardinal text-2xl mb-2">
            Merci !
          </h2>
          <p className="font-serif text-brown/70 text-base leading-relaxed">
            Tu seras parmi les premiers à découvrir Homélia.
            <br />
            À très vite.
          </p>
        </div>
      )}

      {/* Ornement bas */}
      <div className="flex items-center gap-3 mt-16">
        <div className="h-px w-8 bg-gold opacity-40" />
        <span className="text-gold/50 text-sm">✦</span>
        <div className="h-px w-8 bg-gold opacity-40" />
      </div>

      <p className="mt-4 text-brown/40 text-xs font-serif">
        Pas de spam. Juste l'essentiel.
      </p>
    </div>
  );
}
