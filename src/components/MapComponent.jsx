import { useEffect, useRef } from "react";

const MapComponent = ({ location, name, address, placeId }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!window.google || !location || !location.lat || !location.lng) {
      console.warn("Location invalide", location);
      return;
    }
    //

    // Initialiser la carte
    const mapOptions = {
      center: location,
      zoom: 15,
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);

    // Ajouter un marqueur
    const marker = new window.google.maps.Marker({
      position: location,
      map: map,
    });

    markerRef.current = marker;
    // Créer une InfoWindow
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
            <div style="width: 100%;height: 100%; padding: 5px; font-family: Arial, sans-serif;">
          <h3 style="margin: 0 0 10px; font-size: 16px; color: #333;font-weight:bold;">${name}</h3>
          <p style="margin: 0 0 10px; font-size: 14px; color: #666;">${address}</p>
        </div>
          `,
    });
    // Ouvrir l'InfoWindow lorsque le marqueur est cliqué
    marker.addListener("click", () => {
      infoWindow.open({
        anchor: marker,
        map,
      });
    });
    infoWindow.open({
      anchor: marker,
      map,
    });

    // Nettoyer les ressources lors du démontage du composant
    return () => {
      if (marker) {
        marker.setMap(null);
      }
      if (infoWindow) {
        infoWindow.close();
      }
    };
  }, [location, address, name, placeId]);

  return <div ref={mapRef} className="w-full h-[300px] my-5 rounded-lg" />;
};

export default MapComponent;
