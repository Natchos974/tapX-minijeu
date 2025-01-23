import { useContext } from "react";
import { SuccessContext } from "./SuccessContext";

export const useSuccess = () => {
  return useContext(SuccessContext);
};
