import { useState } from "react";
import { useData } from "../utils/useData";
import { SkeletonCard } from "./SkeletonCard";
import { supabase } from "../utils/supabaseClient";

function MiniJeuSettings() {
  const { gameSettings, isLoading, refetchGameSettings } = useData();
  const [updatedSettings, setUpdatedSettings] = useState(
    gameSettings?.settings || [
      { lot_id: 1, title: "cadeau 1", proportion: 50 },
      { lot_id: 2, title: "cadeau 2", proportion: 40 },
      { lot_id: 3, title: "perdu !", proportion: 10 },
      { lot_id: 4, title: "", proportion: 0 },
      { lot_id: 5, title: "", proportion: 0 },
    ]
  );

  const [buttonLoading, setButtonLoading] = useState(false);
  // Gestion du changement de titre
  const handleTitleChange = (lot_id, newTitle) => {
    setUpdatedSettings((prev) =>
      prev.map((setting) =>
        setting.lot_id === lot_id ? { ...setting, title: newTitle } : setting
      )
    );
  };
  // Gestion du changement de proportion
  const handleProportionChange = (lot_id, newProportion) => {
    setUpdatedSettings((prev) =>
      prev.map((setting) =>
        setting.lot_id === lot_id
          ? { ...setting, proportion: Number(newProportion) }
          : setting
      )
    );
  };
  // Mise à jour des paramètres dans Supabase
  const handleSubmit = async () => {
    try {
      setButtonLoading(true);
      // Calcul de la somme des proportions
      const totalProportion = updatedSettings.reduce(
        (sum, setting) => sum + Number(setting.proportion),
        0
      );

      // Vérification que la somme est égale à 100
      if (totalProportion !== 100) {
        alert(
          `La somme des proportions doit être égale à 100. Actuellement : ${totalProportion}`
        );
        return;
      }
      // On prépare l'objet JSON pour la colonne settings
      const settingsJson = updatedSettings.map(
        ({ lot_id, title, proportion }) => ({
          lot_id,
          title,
          proportion,
        })
      );
      //On récupère le user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // On envoie vers Supabase
      const { error } = await supabase.from("game_settings").upsert(
        {
          merchant_id: user?.id,
          settings: settingsJson,
        },
        { onConflict: ["merchant_id"] }
      );

      if (error) throw error;
      alert("Paramètres mis à jour avec succès !");
      refetchGameSettings();
    } catch (err) {
      console.error("Erreur lors de la mise à jour des paramètres:", err);
      alert("Erreur lors de la mise à jour.");
    } finally {
      setButtonLoading(false);
    }
  };

  if (isLoading) return <SkeletonCard />;
  return (
    <div className="max-w-2xl w-full">
      <div className="space-y-4">
        {updatedSettings.map((setting) => (
          <div
            key={setting.lot_id}
            className="bg-slate-50/20 p-4 rounded-lg shadow-lg border border-gray-200 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <label className="font-medium w-full sm:w-32">
              Lot {setting.lot_id} :
            </label>
            <input
              type="text"
              value={setting.title}
              onChange={(e) =>
                handleTitleChange(setting.lot_id, e.target.value)
              }
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Titre du lot"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={setting.proportion}
                onChange={(e) =>
                  handleProportionChange(setting.lot_id, e.target.value)
                }
                className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="100"
              />
              <span className="text-sm text-gray-600">%</span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="button-primary mt-6">
        {buttonLoading ? "Chargement" : "Valider les paramètres"}
      </button>
    </div>
  );
}

export default MiniJeuSettings;
