import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import FormNFCwithMaps from "./FormNFC_withMaps";
import Loader from "./Loader";
import Footer from "./Footer";

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
      window.location.href = url;
    }
  }, [urlExists, url]);
  if (!isNumber) {
    // Redirigez vers une page d'erreur ou affichez un message d'erreur
    return <Navigate to="*" />;
  }
  if (loading) {
    // Afficher un indicateur de chargement
    return <Loader />;
  }
  return !urlExists ? (
    <>
      <FormNFCwithMaps id={id} />
      <Footer />
    </>
  ) : null;
};

export default CheckURL;
