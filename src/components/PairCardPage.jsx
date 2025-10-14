import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

export default function PairCardPage() {
  const { card_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [existingCard, setExistingCard] = useState(false);
  useEffect(() => {
    const verifyCardExistence = async () => {
      // 1. Vérifier si la carte est déjà appairée
      const { data: nfcCard, error } = await supabase
        .from("nfc_card")
        .select("merchant_id, merchant(*)")
        .eq("card_id", card_id)
        .maybeSingle();
      if (error && !error.message.includes("not found")) {
        throw new Error("Erreur lors de la vérification de la carte.");
      }
      if (nfcCard) {
        setExistingCard(true);
        window.alert(
          "Cette carte est déjà appairée à un commerçant vous ne pouvez pas l'appairer"
        );
      }
    };
    if (card_id) {
      verifyCardExistence();
    }
  }, [card_id]);

  const handlePairCard = async () => {
    setIsLoading(true);
    try {
      // 0. Vérifier que l'utilisateur est un commerçant
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error("Vous devez être connecté.");
      }

      // 2. Vérifier que le commerçant a un google_place_id
      const { data: merchant, error: merchantError } = await supabase
        .from("merchant")
        .select("google_place_id")
        .eq("merchant_id", user.id)
        .single();

      if (merchantError || !merchant) {
        throw new Error("Commerçant non trouvé.");
      }

      if (!merchant.google_place_id) {
        window.alert(
          "Vous devez d'abord rentrer votre Google my business dans l'onglet dédié"
        );
        return;
      }

      // 3. Appairer la carte au commerçant
      const { error: pairError } = await supabase.from("nfc_card").upsert({
        card_id,
        merchant_id: user.id,
      });

      if (pairError) throw pairError;

      // 4. Rediriger vers Google My Business
      window.location.href = `https://search.google.com/local/writereview?placeid=${merchant.google_place_id}`;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!existingCard ? (
        <div>
          <h1>Appairer cette carte à votre compte</h1>
          <p>Card ID: {card_id}</p>
          {error && <div className="error">{error}</div>}
          <button
            className="bg-slate-100 border-black rounded-lg px-2 py-1"
            onClick={handlePairCard}
            disabled={isLoading}
          >
            {isLoading ? "Appairage en cours..." : "Appairer la carte"}
          </button>
        </div>
      ) : (
        <p>Carte déjà appairée...</p>
      )}
    </>
  );
}
