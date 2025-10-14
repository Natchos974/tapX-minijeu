import { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import MapComponent from "./MapComponent";
import Card from "./Card";
import { ArrowBigLeftIcon } from "lucide-react";

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
    }
  , [selectedOption, scriptLoaded]);


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
    if (!placeId) {
      alert("Veuillez sélectionner un lieu valide avant de soumettre.");
      return;
    }

    // Afficher une boîte de dialogue de confirmation
    const isConfirmed =
      selectedOption === "google"
        ? window.confirm(
            `Voici le lieu que vous allez paramétrer: \n${name}.\n\nConfirmez vous ?`
          )
        : window.confirm(
            `Voici l'url que vous allez paramétrer: \n${urlSent}\n\nConfirmez vous ?`
          );
    if (isConfirmed) {
      const { error } = await supabase.from("urls").insert([
        {
          id,
          plaque_id: id,
          URL_redirection: urlSent,
          name: name,
          type: selectedCard?.type,
        },
      ]);

      if (error) {
        console.error("Erreur lors de l'appairage de l'URL:", error);
      } else {
        alert("La carte a été paramétrée avec succès!");
        setUrlSetup(true);
        setUrlSent(urlSent);
      }
    }
  };
  const onClick = (value) => {
    selectedOption ? setSelectedOption(null) : setSelectedOption(value);
  };
  return (
    <div className="w-full  min-h-screen bg-gradient-to-b from-slate-200 to-transparent">
      <div className="flex mx-auto flex-col align-middle items-center gap-5 max-w-[800px] pb-5 px-2 md:px-5">
        <img
          src="/tapx-logo.png"
          alt="logo-tapx"
          className="max-w-[190px] md:max-w-[400px] self-center"
        />
        {selectedCard ? (
          <div className="flex flex-col gap-2">
            <div
              onClick={() => onClick(selectedCard?.type)}
              className="flex gap-2 cursor-pointer border text-muted-foreground border-gray-400 w-fit  p-2 rounded-md hover:bg-black hover:text-white "
            >
              <ArrowBigLeftIcon />
              <span className="flex items-center text-sm md:text-base  font-bold">
                Retour
              </span>
            </div>
            <Card
              key={selectedCard.type}
              type={selectedCard.type}
              file={selectedCard.file}
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
            />
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold md:text-3xl text-center">
              Choisir le TapX à configurer:
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 mx-4 md:m-auto gap-2 md:gap-4">
              {cards.map((item) => (
                <Card
                  key={item.id}
                  type={item.type}
                  file={item.file}
                  setSelectedOption={setSelectedOption}
                  selectedOption={selectedOption}
                />
              ))}
            </div>
          </>
        )}
        {selectedOption &&
          (selectedOption == "google" ? (
            <div className="p-2">
              <p className="text-muted-foreground text-sm">
                *Si vous ne trouvez pas votre business, ajoutez simplement la
                ville et le code postale afin d&apos;affiner la recherche
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
                  <MapComponent
                    location={location}
                    name={name}
                    address={myPlace.formatted_address}
                    placeId={placeId}
                  />
                )}
                <button
                  type="submit"
                  className="w-full border border-black text-black py-2 rounded-full hover:bg-black hover:text-white font-bold"
                >
                  Paramétrer la carte
                </button>
              </form>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="p-2 rounded w-full">
                <label className="flex flex-col items-start md:flex-row mb-4 gap-2 md:items-center">
                  <span className="text-slate-700 font-semibold text-sm md:text-lg">
                    {selectedCard.urlPrefix}
                  </span>
                  <input
                    ref={customLinkRef}
                    type="text"
                    placeholder={
                      selectedCard.type == "custom"
                        ? "votre site web"
                        : "identifiant de la page à ajouter à l'url"
                    }
                    className="mt-1 block w-full rounded border border-gray-300 p-2 text-sm md:text-lg"
                    required={true}
                  />
                </label>
                <button
                  type="submit"
                  className="w-full border border-black text-black py-2 rounded-full font-bold hover:bg-black hover:text-white "
                >
                  Paramétrer la carte
                </button>
              </form>
            </>
          ))}
      </div>
    </div>
  );
};

export default FormNFCwithMaps;
