import { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const FormNFC = ({ id }) => {
  const [userUrl, setUserUrl] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [name, setName] = useState("");
  const autoCompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Load the Google Places API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCHZMu6VFihyegwqqNP92lcu5floYe3TNI&libraries=places`;
    script.async = true;
    script.onload = initializeAutocomplete;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeAutocomplete = () => {
    if (!window.google) return;

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        fields: ["place_id", "geometry", "formatted_address", "name"],
      }
    );

    autoCompleteRef.current.addListener("place_changed", handlePlaceChanged);
  };

  const handlePlaceChanged = () => {
    const place = autoCompleteRef.current.getPlace();
    if (place.place_id) {
      console.log("place: ", place);
      setPlaceId(place.place_id);
      setUserUrl(
        `https://search.google.com/local/writereview?placeid=${place.place_id}`
      );
      setName(place.name);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("urls")
      .insert([{ id, plaque_id: id, URL_redirection: userUrl, name: name }]);

    if (error) {
      console.error("Erreur lors de l'appairage de l'URL:", error);
    } else {
      alert("La carte a été paramétrée avec succès!");
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center max-w-[800px] p-5">
      <h1 className="font-semibold">
        Pour paramétrer votre carte NFC veuillez entrez le nom de votre
        entreprise dans le champs ci-dessous...
      </h1>
      <p className="text-muted-foreground text-sm">
        *Si vous ne trouvez pas votre business, ajoutez simplement la ville et
        le code postale afin d afiner la recherche
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-2 rounded shadow-md w-full"
      >
        <label className="block mb-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="Cherchez votre business..."
            className="mt-1 block w-full rounded border border-gray-300 p-2"
            required="true"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormNFC;
