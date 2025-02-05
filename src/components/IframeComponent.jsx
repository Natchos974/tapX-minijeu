import { useState } from "react";

function IframeComponent({ url }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  return (
    <div className="relative w-full max-h-[calc(100vh-90px)]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="loader"></div>
        </div>
      )}
      <div className="w-full h-0 pb-[56.25%]">
        <iframe
          src={url}
          title="3d viewer of the building"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
          className="absolute top-0 left-0 w-full h-full border-none rounded-xl"
          onLoad={handleIframeLoad}
        ></iframe>
      </div>
    </div>
  );
}

export default IframeComponent;
