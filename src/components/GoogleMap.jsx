import { Map } from "@vis.gl/react-google-maps";
import { MarkerWithInfoWindow } from "./MarkerWithInfoWindow";

function GoogleMap({ location, name, address, googleId }) {
  return (
    <div className="w-full h-[400px] max-w-[1200px] rounded-xl shadow-lg">
      <Map
        style={{ height: "100%", width: "100%", borderRadius: "10" }}
        defaultZoom={13}
        defaultCenter={location}
        mapId={googleId}
      >
        <MarkerWithInfoWindow
          location={location}
          name={name}
          address={address}
        />
      </Map>
    </div>
  );
}

export default GoogleMap;
