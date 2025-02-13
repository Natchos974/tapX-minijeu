import { SkeletonCard } from "./SkeletonCard";
import { useData } from "../utils/useData";
import ImageSlider from "./ImageSlider";
import ImageWithPopup from "./ImageWithPopup";
import { Suspense } from "react";

function Home() {
  const { datas, isLoading } = useData();
  const areas = [
    {
      top: 27,
      left: 33,
      width: 15,
      height: 35,
      content: "Terrasse 2",
      description: "Insérez ici la description de la zone...",
      id: 1,
    },
    {
      top: 18,
      left: 49,
      width: 9,
      height: 42,
      content: "Trattoria",
      description: "Insérez ici la description de la zone...",
      id: 2,
    },
    {
      top: 18,
      left: 85,
      width: 12,
      height: 42,
      content: "Boulangerie",
      description: "Insérez ici la description de la zone...",
      id: 4,
    },
    {
      top: 18,
      left: 71,
      width: 13,
      height: 42,
      content: "Terrasse 4",
      description: "Insérez ici la description de la zone...",
      id: 3,
    },
  ];
  return (
    <>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <h1 className="headline-2">
            Découvrez le projet et ses différentes zones
          </h1>
          <p className="flex text-muted-foreground">
            Passez votre souris au dessus de chaque zone pour obtenir des
            informations, cliquez pour accéder à la fiche détaillée de chaque
            zone
          </p>
          <Suspense fallback={<h2>🌀 Loading...</h2>}>
            <ImageWithPopup imageSrc={datas?.plan_masse} zones={areas} />
          </Suspense>
          <ImageSlider imagesArray={datas?.pictures_array} />
        </div>
      )}
    </>
  );
}

export default Home;
