import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return Response.json({ error: "Email invalide." }, { status: 400 });
  }

  const { error } = await supabase
    .from("waitlist")
    .insert({ email: email.trim().toLowerCase() });

  if (error) {
    // Doublon : email déjà inscrit
    if (error.code === "23505") {
      return Response.json(
        { error: "Cet email est déjà inscrit." },
        { status: 409 }
      );
    }
    console.error("Waitlist insert error:", error);
    return Response.json({ error: "Erreur serveur." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
