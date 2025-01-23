import { createContext, useState } from "react";

export const SuccessContext = createContext();

export const SuccessProvider = ({ children }) => {
  const [success, setSuccess] = useState(true);

  return (
    <SuccessContext.Provider value={{ success, setSuccess }}>
      {children}
    </SuccessContext.Provider>
  );
};
