import IframeComponent from "./IframeComponent";

function Interieur() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[2000px]">
      <h1 className="headline-2">
        Vue intérieure permettant de naviguer à l&apos;intérieur d&apos;un
        appartement
      </h1>
      <p className="text-muted-foreground">
        Déplacez vous dans les pièces de l&apos;appartement en faisant bouger la
        vue avec le curseur et en cliquant sur les hot-spots pour changer de
        pièce
      </p>
      <IframeComponent url="https://kuula.co/share/5NjkK/collection/7FCcr?logo=1&info=0&fs=1&vr=1&autorotate=0.04&autop=120&thumbs=3&inst=fr" />
    </div>
  );
}

export default Interieur;
