import { useContext } from "react";
import { DataContext } from "./DataContext";

// Hook personnalisé pour utiliser le contexte
export const useData = () => {
  return useContext(DataContext);
};
