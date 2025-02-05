import IframeComponent from "./IframeComponent";

function Drone() {
  return (
    <div className="flex flex-col gap-5 w-full max-w-[2000px]">
      <h1 className="font-bold text-lg">Vue drone:</h1>
      <IframeComponent url="https://kuula.co/share/5hPBt?logo=1&info=0&fs=1&vr=1&autorotate=0.03&autop=120&thumbs=3&inst=fr" />
    </div>
  );
}

export default Drone;
