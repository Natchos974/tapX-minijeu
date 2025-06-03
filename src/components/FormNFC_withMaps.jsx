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
  const [urlSetup, setUrlSetup] = useState(false);
  const [urlSent, setUrlSent] = useState(null);
  const inputRef = useRef(null);
  const customLinkRef = useRef(null);
  const autoCompleteRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const cards = [
    {
      id: 1,
      type: "google",
      file: "card-google.jpg",
      urlPrefix: null,
    },
    {
      id: 2,
      type: "instagram",
      file: "card-instagram.jpg",
      urlPrefix: "https://www.instagram.com/",
    },
    {
      id: 3,
      type: "facebook",
      file: "card-facebook.jpg",
      urlPrefix: "https://www.facebook.com/",
    },
    {
      id: 4,
      type: "tiktok",
      file: "card-tiktok.jpg",
      urlPrefix: "https://www.tiktok.com/",
    },
    {
      id: 5,
      type: "tripadvisor",
      file: "card-tripadvisor.jpg",
      urlPrefix: "https://www.tripadvisor.com/",
    },
  ];
  const selectedCard = selectedOption
    ? cards.find((card) => card.type === selectedOption)
    : null;
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
  useEffect(() => {
    if (urlSetup && urlSent) {
      window.location.href = urlSent;
    }
  }, [urlSetup, urlSent]);

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

    const customUrl = selectedCard.urlPrefix + customLinkRef?.current?.value;
    const urlSent = selectedOption == "google" ? userUrl : customUrl;
    // Afficher une boîte de dialogue de confirmation
    const isConfirmed =
      selectedOption === "google"
        ? window.confirm(
            `Voici le lieu que vous allez paramétrer: ${name}. \nConfirmez vous ? \nAttention, tout changement ultérieur sera facturé 4€`
          )
        : window.confirm(
            `Voici l'url que vous allez paramétrer: ${urlSent}. \nConfirmez vous ? \nAttention, tout changement ultérieur sera facturé 4€`
          );
    if (isConfirmed) {
      const { error } = await supabase
        .from("urls")
        .insert([{ id, plaque_id: id, URL_redirection: urlSent, name: name }]);

      if (error) {
        console.error("Erreur lors de l'appairage de l'URL:", error);
      } else {
        alert("La carte a été paramétrée avec succès!");
        setUrlSetup(true);
        setUrlSent(urlSent);
      }
    }
  };
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-200 to-transparent">
      <div className="flex flex-col gap-5 justify-center max-w-[800px] py-5 px-2 md:px-5">
        <h1 className="text-sm font-bold md:text-3xl text-center">
          Choisir le TapX à configurer:
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-2 md:m-auto gap-2">
          {selectedCard ? (
            <Card
              key={selectedCard.type}
              type={selectedCard.type}
              file={selectedCard.file}
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
            />
          ) : (
            cards.map((item) => (
              <Card
                key={item.id}
                type={item.type}
                file={item.file}
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
              />
            ))
          )}
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
              <form onSubmit={handleSubmit} className=" p-2 rounded w-full">
                <label className="flex mb-4 gap-2 items-center">
                  <span className="text-sm md:text-lg">
                    {selectedCard.urlPrefix}
                  </span>
                  <input
                    ref={customLinkRef}
                    type="text"
                    placeholder="identifiant de la page"
                    className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm md:text-lg"
                    required={true}
                  />
                </label>
                <button
                  type="submit"
                  className="w-full border border-black text-black py-2 rounded-full hover:bg-slate-400 font-bold"
                >
                  Envoyer
                </button>
              </form>
            </>
          ))}
      </div>
    </div>
  );
};

export default FormNFCwithMaps;
