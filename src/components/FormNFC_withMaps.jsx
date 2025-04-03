/* eslint-disable no-useless-escape */
import { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import MapComponent from "./MapComponent";
import Card from "./Card";

const FormNFCwithMaps = ({ id }) => {
  const [userUrl, setUserUrl] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [location, setLocation] = useState(null);
  const [myPlace, setmyPlace] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const customLinkRef = useRef(null);
  const autoCompleteRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const cards = [
    {
      id: 1,
      value: "google",
      name: "Avis google",
      description: "Rediriger vers une demande d'avis Google",
    },
    {
      id: 2,
      value: "custom_link",
      name: "Lien customisé",
      description:
        "Rediriger vers une page facebook, instagram, tiktok, linkedIn... ou site perso",
    },
  ];

  useEffect(() => {
    setLocation(null);
    if (selectedOption === "google") {
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
    }
  }, [selectedOption, scriptLoaded]);

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
    if (selectedOption === "google" && !placeId) {
      alert("Veuillez sélectionner un lieu valide avant de soumettre.");
      return;
    }
    if (customLinkRef?.current?.value) {
      const regex = new RegExp(
        /^(http(s)?:\/\/)[\w-._~:/?#\[\]@!$&'()*+,;=.]+$/
      );
      const customUrl = customLinkRef.current.value;

      if (!regex.test(customUrl)) {
        alert(
          "Veuillez entrer une URL au format suivant: \n - https://www.instagram.com/votre-page \n-  https://www.monsiteperso.com"
        );
        return;
      }
    }

    const urlSent =
      selectedOption == "google" ? userUrl : customLinkRef.current.value;
    console.log(urlSent);
    const { error } = await supabase
      .from("urls")
      .insert([{ id, plaque_id: id, URL_redirection: urlSent, name: name }]);

    if (error) {
      console.error("Erreur lors de l'appairage de l'URL:", error);
    } else {
      alert("La carte a été paramétrée avec succès!");
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center max-w-[800px] py-5 px-2 md:px-5">
      <h1 className="font-semibold text-sm text-center md:text-base md:text-left">
        Bienvenue dans la page de paramétrage de votre carte NFC, choisissez
        l&apos;une des options ci-dessous
      </h1>
      <div className="gap-4 flex flex-col">
        {cards.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            description={item.description}
            value={item.value}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
          />
        ))}
      </div>
      {selectedOption &&
        (selectedOption == "google" ? (
          <>
            <p className="text-muted-foreground text-sm">
              *Si vous ne trouvez pas votre business, ajoutez simplement la
              ville et le code postale afin d&apos;affiner la recherche
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
                  required={true}
                />
              </label>
              {location && (
                <MapComponent
                  location={location}
                  name={name}
                  address={myPlace.formatted_address}
                  placeId={placeId}
                />
              )}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 font-bold"
              >
                Envoyer
              </button>
            </form>
          </>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-2 rounded shadow-md w-full"
            >
              <label className="block mb-4">
                <input
                  ref={customLinkRef}
                  type="text"
                  placeholder="Insérez le lien ici"
                  className="mt-1 block w-full rounded border border-gray-300 p-2"
                  required={true}
                />
              </label>

              <button
                type="submit"
                className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-blue-700 font-bold"
              >
                Envoyer
              </button>
            </form>
          </>
        ))}
    </div>
  );
};

export default FormNFCwithMaps;
