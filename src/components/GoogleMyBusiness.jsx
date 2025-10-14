import { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";

import GoogleMap from "./GoogleMap";

export default function GoogleMyBusiness() {
  const [userUrl, setUserUrl] = useState("");
  const [urlSetup, setUrlSetup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [myPlace, setmyPlace] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const autoCompleteRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setLocation(null);

    if (!scriptLoaded) {
      // Load the Google Places API script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_API_KEY
      }&libraries=places`;
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
        initializeAutocomplete();
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } else {
      initializeAutocomplete();
    }
  }, [scriptLoaded]);
  const initializeAutocomplete = () => {
    if (!window.google || !inputRef.current) return;
    const options = {
      fields: ["place_id", "geometry", "formatted_address", "name"],
    };
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.setComponentRestrictions({
      country: ["fr", "re"],
    });
    inputRef.current.addEventListener("input", (event) => {
      if (event.target.value.trim() === "") {
        setLocation(null);
      }
    });
    autoCompleteRef.current.addListener("place_changed", () => {
      const place = autoCompleteRef.current.getPlace();
      setmyPlace(place);
      if (place.place_id) {
        console.log("place: ", place);
        setPlaceId(place.place_id);
        setUserUrl(
          `https://search.google.com/local/writereview?placeid=${place.place_id}`
        );
        setName(place.name);
      }
      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      setLocation(place.geometry.location);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const {
        data: { user, error: authError },
      } = await supabase.auth.getUser();
      console.log(user);
      if (authError || !user) throw new Error("Utilisateur non connecté.");

      if (!placeId) {
        alert("Veuillez sélectionner un lieu valide avant de soumettre.");
        return;
      }

      // Afficher une boîte de dialogue de confirmation
      const isConfirmed = window.confirm(
        `Voici le lieu que vous allez paramétrer: \n${name}.\n\nConfirmez vous ?`
      );

      if (isConfirmed) {
        // Mettre à jour le google_place_id du commerçant
        const { error } = await supabase
          .from("merchant")
          .update({
            google_place_id: userUrl,
            location: location,
            address: myPlace.formatted_address,
            name: name,
          })
          .eq("merchant_id", user.id);

        if (error) throw error;

        if (error) {
          console.error("Erreur lors de l'appairage de l'URL:", error);
        } else {
          alert("le lieu a été paramétrée avec succès!");
          setUrlSetup(true);
          //setUrlSent(urlSent);
        }
      }
    } catch (err) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-2">
      <p className="text-muted-foreground text-sm">
        *Si vous ne trouvez pas votre business, ajoutez simplement la ville et
        le code postale afin d&apos;affiner la recherche
      </p>

      <form onSubmit={handleSubmit} className="w-full">
        <label className="block mb-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="Cherchez votre business..."
            className="mt-1 block w-full rounded border border-gray-300 p-2"
            required={true}
          />
        </label>
        {location && (
          /*<MapComponent
            location={location}
            name={name}
            address={myPlace.formatted_address}
            placeId={placeId}
          />*/
          <GoogleMap
            name={name}
            location={location}
            address={myPlace.formatted_address}
            googleId={"Demo-map"}
          />
        )}
        <button
          type="submit"
          className="w-full border border-black text-black py-2 rounded-full hover:bg-black hover:text-white font-bold"
        >
          Associer le google business
        </button>
      </form>
    </div>
  );
}
