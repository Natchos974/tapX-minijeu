import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { SkeletonCard } from "./SkeletonCard";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

function SpinningWheel() {
  //const { gameSettings, isLoading } = useData();
  const { merchant_id } = useParams();
  const [gameSettings, setGameSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!merchant_id) return;
    async function getSettings() {
      try {
        const { data, error } = await supabase
          .from("game_settings")
          .select("settings")
          .eq("merchant_id", merchant_id)
          .maybeSingle();
        if (error) throw error;
        if (data) {
          setGameSettings(data.settings);
        }
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des settings de la roue",
          err
        );
        throw err;
      } finally {
        setLoading(false);
      }
    }
    getSettings();
  }, [merchant_id]);
  const settings = gameSettings?.filter((item) => item.proportion > 0);
  const dataWheel = settings?.map((item) => ({
    option: item.title,
    optionSize: item.proportion,
  }));
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [prizeWon, setPrizeWon] = useState(null);
  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * dataWheel.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };
  if (loading) return <SkeletonCard />;
  return (
    <div className="flex flex-col gap-4 items-center">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={dataWheel}
        outerBorderColor={["#f2f2f2"]}
        outerBorderWidth={[10]}
        innerBorderColor={["#f2f2f2"]}
        radiusLineColor={["#dedede"]}
        radiusLineWidth={[1]}
        fontSize={20}
        textColors={["#ffffff"]}
        backgroundColors={[
          "#24A3CA",
          "#F99533",
          "#24CA69",
          "#514E50",
          "#46AEFF",
          "#9145B7",
        ]}
        onStopSpinning={() => {
          setMustSpin(false);
          setPrizeWon(dataWheel[prizeNumber].option);
        }}
      />
      <button className="button-primary" onClick={handleSpinClick}>
        Lancer la roue
      </button>
      {!mustSpin && prizeWon ? `Vous avez gagné le lot: ${prizeWon}` : ""}
    </div>
  );
}

export default SpinningWheel;
