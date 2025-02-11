import { useState } from "react";

const ImageWithPopup = ({ imageSrc, zones }) => {
  const [hoveredZone, setHoveredZone] = useState(null);

  const handleMouseEnter = (zone) => {
    setHoveredZone(zone);
  };

  const handleMouseLeave = () => {
    setHoveredZone(null);
  };

  return (
    <div className="relative w-full max-w-full h-auto">
      <img
        src={imageSrc}
        alt="Interactive"
        className="w-full h-auto object-cover rounded-md"
      />
      {zones.map((zone, index) => (
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
          className="cursor-pointer border-red-400 border-[3px] md:border-[5px] border-dashed"
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
          className="bg-slate-50 p-2 rounded shadow-md mt-2"
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
