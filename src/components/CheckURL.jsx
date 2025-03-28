// CheckURL.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { supabase } from "../utils/supabaseClient";
import FormURL from "./FormURL.Jsx";

const CheckURL = () => {
  const { id } = useParams();
  const [urlExists, setUrlExists] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("urls")
        .select("URL_redirection")
        .eq("id", id)
        .single();

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

  return !urlExists ? <FormURL id={id} /> : null;
};

export default CheckURL;
