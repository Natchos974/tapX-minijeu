import IframeComponent from "./IframeComponent";

function Interieur() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[2000px]">
      <h1 className="headline-2">
        Vue intérieure permettant de naviguer à l&apos;intérieur d&apos;un
        appartement
      </h1>
      <IframeComponent url="https://kuula.co/share/5NjkK/collection/7FCcr?logo=1&info=0&fs=1&vr=1&autorotate=0.04&autop=120&thumbs=3&inst=fr" />
    </div>
  );
}

export default Interieur;
