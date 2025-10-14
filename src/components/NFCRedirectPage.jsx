import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

export default function NFCRedirectPage() {
  const { card_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const checkCardStatus = async () => {
      try {
        // 1. Vérifier si la carte est déjà appairée
        const { data: nfcCard, error } = await supabase
          .from("nfc_card")
          .select("merchant_id, merchant(*)")
          .eq("card_id", card_id)
          .maybeSingle();
        console.log("nfc card", nfcCard);
        if (error && !error.message.includes("not found")) {
          throw new Error("Erreur lors de la vérification de la carte.");
        }
        // 2. Si la carte est appairée, rediriger vers Google My Business
        if (nfcCard?.merchant?.google_place_id) {
          window.location.href = `https://search.google.com/local/writereview?placeid=${nfcCard.merchant.google_place_id}`;
          window.open(
            `/wheel/${nfcCard.merchant_id}`,
            "spinningWheelTab",
            "popup"
          );
          return;
        }

        // 3. Sinon, rediriger vers une page de connexion pour le commerçant
        window.location.href = `/pair-card/${card_id}`;
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (card_id) {
      checkCardStatus();
    }
  }, [card_id]);

  if (isLoading) {
    return <div>Vérification de la carte en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return null; // La redirection se fait avant ce rendu
}
