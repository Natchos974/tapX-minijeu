import { useEffect, useState } from "react";
import { useSession } from "../utils/useSession";

const InitialLoader = ({ children }) => {
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://dumbstockapi.com/stock?countries=CA,US&ticker_search=AA"
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        return json;
      } catch (error) {
        console.log("Get Courses with progress error", error);
        return [];
      }
    }

    if (session) {
      // Appel à l'API pour récupérer les cours de l'utilisateur
      fetchData()
        .then((data) => {
          setDatas(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
          setIsLoading(false);
        });
    }
  }, [session]);

  /*if (isLoading) {
    return <div>Loading...</div>; // Afficher un indicateur de chargement
  }*/

  return children({
    datas,
    isLoading,
  });
};

export default InitialLoader;
