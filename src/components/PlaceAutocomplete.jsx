import { useState, useEffect, useRef } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

const PlaceAutocomplete = ({ onPlaceSelect }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const [predictions, setPredictions] = useState([]); // Liste des lieux suggérés
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));

    // Utilisation d'un service d'autocomplétion pour obtenir des suggestions
    const service = new places.AutocompleteService();

    inputRef.current.addEventListener("input", () => {
      const query = inputRef.current.value;
      if (query) {
        service.getPlacePredictions({ input: query }, (predictions, status) => {
          if (status === "OK") {
            setPredictions(predictions); // Met à jour la liste des suggestions
          } else {
            setPredictions([]); // Vide la liste si la recherche échoue
          }
        });
      } else {
        setPredictions([]); // Vide la liste si le champ est vide
      }
    });
  }, [places]);

  const handleSelect = (place) => {
    onPlaceSelect(place); // Retourne la place sélectionnée
    setPredictions([]); // Vide les prédictions après la sélection
  };

  return (
    <div className="autocomplete-container">
      <input ref={inputRef} placeholder="Search for a place" />
    </div>
  );
};

export default PlaceAutocomplete;
