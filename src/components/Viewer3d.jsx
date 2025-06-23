import { useEffect, useRef, useState } from "react";
import { SpinViewer } from "@egjs/view360";

function Viewer3d() {
  const containerRef = useRef(null);
  const [angle, setAngle] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  let spinView;

  // Initialisation du SpinViewer dans useEffect
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current = new SpinViewer(containerRef.current, {
        imageUrl: "/spriteSheetV2.png",
        rowCount: 51,
        scale: 3,
        width: "100%",
      });
      containerRef.current.on("load", () => {
        setIsLoading(false);
        containerRef.current.spinBy(360, { duration: 3000 });
      });
      containerRef.current.on("change", (event) => {
        setAngle(Math.round(Number(event.angle)));
      });
    }
  }, []);

  useEffect(() => {
    // Assurez-vous que spinView est bien initialisé avant d'essayer de le manipuler
    if (containerRef.current) {
      containerRef.current.spinTo(angle);
    }
  }, [angle, spinView]);

  const handleInputChange = (event) => {
    setAngle(Number(event.target.value));
    //console.log(angle);
    if (spinView) {
      spinView.spinTo(angle);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="headline-2">Visualisation de résidence en 3D</h1>
      <p className="text-muted-foreground">
        Faîtes tourner la résidence en la sélectionnant ou en bougeant le
        curseur !{" "}
      </p>
      <div className="max-w-[1200px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <div className="loader"></div>{" "}
            {/* Remplacez par votre composant de loader */}
          </div>
        )}
        <div
          ref={containerRef}
          style={{
            userSelect: "none",
            WebkitUserDrag: "none",
            touchAction: "pan-y",
            width: "100%",
            height: "auto",
          }}
          className="cursor-pointer rounded-lg"
        ></div>
        <input
          type="range"
          min={0}
          max={360}
          value={angle}
          onChange={handleInputChange}
          className="cursor-pointer w-full mt-5"
        />
      </div>
    </div>
  );
}

export default Viewer3d;
