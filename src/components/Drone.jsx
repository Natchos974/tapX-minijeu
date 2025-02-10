import IframeComponent from "./IframeComponent";

function Drone() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[2000px]">
      <h1 className="headline-2">
        Vue drone 360 interractive avec inscrustation de la résidence en 3D
      </h1>
      <p className="text-muted-foreground">
        Déplacez vous à 360° en faisant bouger la vue avec le curseur
      </p>
      <IframeComponent url="https://kuula.co/share/5hPBt?logo=1&info=0&fs=1&vr=1&autorotate=0.03&autop=120&thumbs=3&inst=fr" />
    </div>
  );
}

export default Drone;
