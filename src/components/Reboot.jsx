import { Navigate, useParams } from "react-router-dom";

import { supabase } from "../utils/supabaseClient";
import { useState } from "react";

function Reboot() {
  let { id } = useParams();
  let numberId = Number(id);
  const [urlRebooted, seturlRebooted] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const recoveryKey = e.currentTarget.elements.recoveryInput.value;
    const { data, error } = await supabase
      .from("recovery_table")
      .select()
      .eq("recovery_key", recoveryKey)
      .maybeSingle();
    if (error) {
      alert("La clé de recovery n'existe pas");
      throw new Error("La clé de recovery n'existe pas");
    }
    //console.log(data);
    else if (data && data.card_key == numberId) {
      // Si la clé de récupération existe et qu'elle correspond a la clé de la carte, supprimer la ligne correspondante dans la table urls
      const { error: deleteError } = await supabase
        .from("urls")
        .delete()
        .eq("id", numberId);

      if (deleteError) {
        console.error("Error deleting URL:", deleteError);
        alert("Erreur lors de la suppression de l'URL");
      } else {
        alert("La carte a été rebootée avec succès!");
        seturlRebooted(true);
      }
    } else {
      alert(
        "La clé de récupération ne correspond pas à celle de la carte que vous essayez de rebooter"
      );
    }
  }
  if (urlRebooted) return <Navigate to={`/config/${id}`} />;
  return (
    <div className="flex flex-col gap-5 justify-center max-w-[800px] py-5 px-2 md:px-5">
      <h1 className="font-semibold text-sm text-center md:text-base md:text-left">
        Insérez ci-dessous la clé de reboot, disponible sur la carte NFC
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-2 rounded shadow-md w-full"
      >
        <label className="block mb-4">
          <input
            id="recoveryInput"
            type="text"
            placeholder="Insérez la clé ici.."
            className="mt-1 block w-full rounded border border-gray-300 p-2"
            required={true}
          />
        </label>
        <button
          type="submit"
          className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-blue-700 font-bold"
        >
          Reboot carte
        </button>
      </form>
    </div>
  );
}

export default Reboot;
