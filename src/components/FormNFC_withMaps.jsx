import { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const FormNFCwithMaps = ({ id }) => {
  const [userUrl, setUserUrl] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [placeId, setPlaceId] = useState(null);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const customLinkRef = useRef(null);
  const autoCompleteRef = useRef(null);
  const mapRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infoWindow, setInfowindow] = useState(null);
  const [infowindowRef, setInfowindowRef] = useState(null);

  useEffect(() => {
    if (selectedOption === "google") {
      if (!scriptLoaded) {
        // Load the Google Places API script
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCHZMu6VFihyegwqqNP92lcu5floYe3TNI&libraries=places`;
        script.async = true;
        script.onload = () => {
          setScriptLoaded(true);
          initializeMap();
          initializeAutocomplete();
        };
        document.head.appendChild(script);

        return () => {
          document.head.removeChild(script);
        };
      } else {
        initializeMap();
        initializeAutocomplete();
      }
    }
  }, [selectedOption, scriptLoaded]);

  /* useEffect(() => {
    if (selectedOption === "google") {
      initializeMap();
      initializeAutocomplete();
    }
  }, [selectedOption, scriptLoaded]);*/

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: -21.115141, lng: 55.536384 },
      zoom: 10,
    });

    setMap(mapInstance);
    const infowindow = new window.google.maps.InfoWindow();
    setInfowindow(infowindow);
    const markerInstance = new window.google.maps.Marker({
      map: mapInstance,
    });

    setMarker(markerInstance);

    markerInstance.addListener("click", () => {
      infowindow.open({
        anchor: markerInstance,
        mapInstance,
      });
    });
  };

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
    autoCompleteRef.current.addListener("place_changed", () => {
      const place = autoCompleteRef.current.getPlace();
      if (place.place_id) {
        console.log("place: ", place);
        setPlaceId(place.place_id);
        setUserUrl(
          `https://search.google.com/local/writereview?placeid=${place.place_id}`
        );
        setName(place.name);
        if (!place.geometry || !place.geometry.location) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }
        if (place.geometry.viewport) {
          console.log("I fitbound on this viewport", place.geometry.viewport);
          console.log(map);

          map.fitBounds(place.geometry.viewport);
          map.setZoom(3);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        infoWindow.setContent(`
            <div>
              <strong>${place.name}</strong><br>
              ${place.formatted_address}
            </div>
          `);
        infoWindow.open(map, marker);
      }
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
    <div className="flex flex-col gap-5 justify-center max-w-[800px] p-5">
      <h1 className="font-semibold">
        Bienvenue dans la page de paramétrage de votre carte NFC...
      </h1>
      <Select onValueChange={(value) => setSelectedOption(value)}>
        <SelectTrigger className="">
          <SelectValue placeholder="Choisissez le type de lien souhaité" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="google">Demande d&apos;avis Google</SelectItem>
          <SelectItem value="custom_link ">
            Lien autres (page Insta, Tiktok, Facebook, ...)
          </SelectItem>
        </SelectContent>
      </Select>
      {selectedOption &&
        (selectedOption == "google" ? (
          <>
            <p className="text-muted-foreground text-sm">
              *Si vous ne trouvez pas votre business, ajoutez simplement la
              ville et le code postale afin d afiner la recherche
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
              <div
                ref={mapRef}
                className="h-[400px] w-full my-[20px] rounded-lg"
              ></div>
              <div ref={infowindowRef}>
                <span id="place-name"></span>
                <br />
                <span id="place-address"></span>
              </div>
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
