import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import FormNFCwithMaps from "./FormNFC_withMaps";

const CheckURL = () => {
  const { id } = useParams();
  const isNumber = /^\d+$/.test(id);
  const [urlExists, setUrlExists] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("urls")
        .select("URL_redirection")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        setLoading(false);
        console.error("Error fetching URL:", error);
      } else if (data) {
        setUrlExists(true);
        setUrl(data.URL_redirection);
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (urlExists && url) {
      console.log("Voici lurl de reidrection", url);
      window.location.href = url;
    }
  }, [urlExists, url]);
  if (!isNumber) {
    // Redirigez vers une page d'erreur ou affichez un message d'erreur
    return <Navigate to="*" />;
  }
  if (loading) {
    // Afficher un indicateur de chargement
    return (
      <div className="w-full overflow-hidden">
        <div className="h-1 bg-gray-200 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 h-full animate-load"></div>
        </div>
        <p className="w-full text-center mt-3">Chargement en cours...</p>
      </div>
    );
  }
  return !urlExists ? (
    <>
      <FormNFCwithMaps id={id} />
    </>
  ) : null;
};

export default CheckURL;
