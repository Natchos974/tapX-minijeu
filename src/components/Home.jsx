import { useData } from "../utils/useData";
import GoogleMap from "./GoogleMap";
import GoogleBusinessSelection from "./GoogleBusinessSelection";
import { supabase } from "../utils/supabaseClient";
import { useState } from "react";

function Home() {
  const { merchant, isLoading, refetchMerchant } = useData();
  const [buttonLoading, setButtonLoading] = useState(false);
  if (isLoading) {
    return <p>Chargement en cours</p>;
  }
  async function handleDelete() {
    try {
      setButtonLoading(true);
      //On récupère le user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // On envoie vers Supabase
      const { error } = await supabase
        .from("merchant")
        .update({
          name: null,
          google_place_id: null,
          location: null,
          address: null,
        })
        .eq("merchant_id", user?.id);

      if (error) throw error;
      alert("Paramètres mis à jour avec succès !");
      refetchMerchant();
    } catch (err) {
      console.error("Erreur lors de la mise à jour des paramètres:", err);
      alert("Erreur lors de la mise à jour.");
    } finally {
      setButtonLoading(false);
    }
  }
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="headline-1">Paramétrage de votre commerce</h1>
      {merchant?.google_place_id && merchant?.location ? (
        <>
          <h2 className="paragraph">
            Vous avez déjà paramétré votre commerce sur le lieu suivant:
          </h2>
          <GoogleMap
            location={merchant.location}
            name={merchant.name}
            address={merchant.address}
            googleId={merchant.google_place_id}
          />
          <button className="button-primary" onClick={handleDelete}>
            {buttonLoading ? "Chargement..." : "Réinitialiser le commerce"}
          </button>
        </>
      ) : (
        <>
          <h2 className="text-muted-foreground">
            Renseignez ci dessous votre compte google business afin de le lier à
            vos cartes tapX
          </h2>
          <GoogleBusinessSelection onSuccess={refetchMerchant} />
        </>
      )}
    </div>
  );
}

export default Home;
