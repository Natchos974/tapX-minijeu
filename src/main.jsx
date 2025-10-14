//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SessionProvider } from "./utils/SessionProvider.jsx";
import { Toaster } from "@/components/ui/toaster";
import { APIProvider } from "@vis.gl/react-google-maps";
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
createRoot(document.getElementById("root")).render(
  <SessionProvider>
    <APIProvider
      apiKey={apiKey}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <App />
    </APIProvider>
    <Toaster />
  </SessionProvider>
);
