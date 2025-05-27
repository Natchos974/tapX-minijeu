import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import Loader from "./Loader";
import Reboot from "./Reboot";

function CheckReboot() {
  const { id } = useParams();
  const isNumber = /^\d+$/.test(id);
  const [urlExists, setUrlExists] = useState(false);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!isNumber) {
    // Redirigez vers une page d'erreur ou affichez un message d'erreur
    return <Navigate to="*" />;
  }
  if (loading) return <Loader />;
  return urlExists ? (
    <Reboot />
  ) : (
    <div>Cette id n&apos;est associé à aucune URL dans la base de donnée</div>
  );
}

export default CheckReboot;
