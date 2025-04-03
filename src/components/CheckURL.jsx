import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import FormNFCwithMaps from "./FormNFC_withMaps";

const CheckURL = () => {
  const { id } = useParams();
  const isNumber = /^\d+$/.test(id);
  const [urlExists, setUrlExists] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("urls")
        .select("URL_redirection")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching URL:", error);
      } else if (data) {
        setUrlExists(true);
        setUrl(data.URL_redirection);
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
  return !urlExists ? (
    <>
      <FormNFCwithMaps id={id} />
    </>
  ) : null;
};

export default CheckURL;
