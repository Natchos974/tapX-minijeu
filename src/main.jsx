//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SessionProvider } from "./utils/SessionProvider.jsx";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")).render(
  <SessionProvider>
    <App />
    <Toaster />
  </SessionProvider>
);
