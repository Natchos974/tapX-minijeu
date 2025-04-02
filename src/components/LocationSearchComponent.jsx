// LocationSearchComponent.js
import { useState } from "react";
import PlaceAutocomplete from "./PlaceAutocomplete"; // Importation du composant PlaceAutocomplete

const LocationSearchComponent = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place); // Met à jour l'état avec la place sélectionnée
  };

  return (
    <div>
      <h2>Search for a Place</h2>
      <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />

      {selectedPlace && (
        <div className="selected-place">
          <h3>Selected Place:</h3>
          <p>Name: {selectedPlace.name}</p>
          <p>Address: {selectedPlace.formatted_address}</p>
        </div>
      )}
    </div>
  );
};

export default LocationSearchComponent;
