import {
  AdvancedMarker,
  ControlPosition,
  InfoWindow,
  Map,
  MapControl,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";

function GoogleBusinessSelection({ onSuccess }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    []
  );
  const handleClose = useCallback(() => setInfoWindowShown(false), []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const {
        data: { user, error: authError },
      } = await supabase.auth.getUser();
      if (authError || !user) throw new Error("Utilisateur non connecté.");

      if (!selectedPlace?.place_id) {
        alert("Veuillez sélectionner un lieu valide avant de soumettre.");
        return;
      }

      // Afficher une boîte de dialogue de confirmation
      const isConfirmed = window.confirm(
        `Voici le lieu que vous allez paramétrer: \n${selectedPlace?.name}.\n\nConfirmez vous ?`
      );

      if (isConfirmed) {
        // Mettre à jour le google_place_id du commerçant
        const { error } = await supabase
          .from("merchant")
          .update({
            google_place_id: selectedPlace?.place_id,
            location: selectedPlace?.geometry?.location,
            address: selectedPlace?.formatted_address,
            name: selectedPlace?.name,
          })
          .eq("merchant_id", user.id);

        if (error) throw error;

        alert("le lieu a été paramétrée avec succès!");
        if (onSuccess) {
          onSuccess(); // Appeler le callback pour rafraîchir les données
        }
      }
    } catch (err) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Map
        mapId={"bf51a910020fa25a"}
        defaultZoom={3}
        defaultCenter={{ lat: 46.951488, lng: 2.459588 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        style={{ height: "300px", width: "100%" }}
      >
        <AdvancedMarker
          ref={markerRef}
          position={null}
          onClick={handleMarkerClick}
        />
        {infoWindowShown && (
          <InfoWindow anchor={marker} onClose={handleClose}>
            <h2 className="font-bold pb-2">{selectedPlace?.name}</h2>
            <p>{selectedPlace?.formatted_address}</p>
          </InfoWindow>
        )}
      </Map>
      <MapControl position={ControlPosition.BOTTOM}>
        <div className="autocomplete-control">
          <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
        </div>
      </MapControl>
      <MapHandler place={selectedPlace} marker={marker} />
      <button onClick={handleSubmit} className="button-primary">
        {isLoading ? "Chargement.." : "Paramétrer le lieu"}
      </button>
    </>
  );
}
const MapHandler = ({ place, marker }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);

  return null;
};

const PlaceAutocomplete = ({ onPlaceSelect }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address", "place_id", "rating"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <input
        className="rounded-lg"
        ref={inputRef}
        placeholder="Cherchez ici votre commerce"
      />
    </div>
  );
};
export default GoogleBusinessSelection;
