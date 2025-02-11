import { Link } from "react-router-dom";
import { SkeletonCard } from "./SkeletonCard";
import { Button } from "./ui/button";
import { useData } from "../utils/useData";
import ImageSlider from "./ImageSlider";
import ImageWithPopup from "./ImageWithPopup";

function Home() {
  const { datas, isLoading } = useData();
  const zones = datas?.zones;
  const areas = [
    {
      top: 27,
      left: 33,
      width: 15,
      height: 35,
      content: "Terrasse 2",
      description: "Insérez ici la description de la zone...",
    },
    {
      top: 18,
      left: 49,
      width: 9,
      height: 42,
      content: "Trattoria",
      description: "Insérez ici la description de la zone...",
    },
    {
      top: 18,
      left: 85,
      width: 12,
      height: 42,
      content: "Boulangerie",
      description: "Insérez ici la description de la zone...",
    },
    {
      top: 18,
      left: 71,
      width: 13,
      height: 42,
      content: "Terrasse 4",
      description: "Insérez ici la description de la zone...",
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
            Accéder aux différentes zones en cliquant sur le bouton
            correspondant
          </p>
          <div>
            {zones && (
              <div className="flex flex-col w-full md:flex-row gap-2">
                {zones.map((zone) => (
                  <Button
                    key={zone.id}
                    asChild
                    variant="outline"
                    className="flex w-full"
                  >
                    <Link to={`/zone/${zone.id}`}>{zone.name}</Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
          <p className="flex text-muted-foreground">
            Passez votre souris au dessus de chaque zone pour obtenir des
            informations
          </p>
          <div>
            <ImageWithPopup imageSrc={datas?.plan_masse} zones={areas} />
          </div>

          <ImageSlider imagesArray={datas?.pictures_array} />
        </div>
      )}
    </>
  );
}

export default Home;
