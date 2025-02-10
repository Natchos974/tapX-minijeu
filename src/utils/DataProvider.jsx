import { useState, useEffect } from "react";
import { useSession } from "./useSession";
import { supabase } from "./supabaseClient";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children }) => {
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    async function fetchData(projectId) {
      try {
        const { data } = await supabase
          .from("project")
          .select(
            `
            *,
            zones (*)
          `
          )
          .eq("id", projectId)
          .single();
        return data;
      } catch (error) {
        console.log("Get Courses with progress error", error);
        return [];
      }
    }

    fetchData(1)
      .then((data) => {
        setDatas(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      });
  }, [session]);

  return (
    <DataContext.Provider value={{ datas, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};
