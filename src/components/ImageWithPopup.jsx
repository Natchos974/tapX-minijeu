import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ImageWithPopup = ({ imageSrc, zones }) => {
  const [hoveredZone, setHoveredZone] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const handleMouseEnter = (zone) => {
    setHoveredZone(zone);
  };

  const handleMouseLeave = () => {
    setHoveredZone(null);
  };
  const handleClick = (zone) => {
    navigate(`/zone/${zone.id}`);
  };

  return (
    <div className="relative w-full max-w-full h-auto">
      <img
        src={imageSrc}
        alt="Interactive"
        className="w-full h-auto object-cover rounded-md"
        onLoad={() => setIsLoaded(true)}
      />
      {isLoaded &&
        zones.map((zone, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${zone.top}%`,
              left: `${zone.left}%`,
              width: `${zone.width}%`,
              height: `${zone.height}%`,
            }}
            onMouseEnter={() => handleMouseEnter(zone)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(zone)}
            className="cursor-pointer border-red-400 border-[1px] md:border-[5px] border-dashed"
          ></div>
        ))}
      {hoveredZone && (
        <div
          style={{
            position: "absolute",
            top: `${hoveredZone.top + hoveredZone.height}%`,
            left: `${hoveredZone.left}%`,
            transform: "translateX(-50%)",
          }}
          className="bg-slate-50 p-2 z-50 rounded shadow-md mt-2 invisible md:visible"
        >
          <h2 className="text-lg text-slate-600 font-semibold">
            {hoveredZone.content}
          </h2>
          <span className="text-base text-slate-600">
            {hoveredZone.description}
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageWithPopup;
