import { Link } from "react-router-dom";
import { SkeletonCard } from "./SkeletonCard";
import { Button } from "./ui/button";
import { useData } from "../utils/useData";

function Home() {
  const { datas, isLoading } = useData();
  const zones = datas?.zones;
  return (
    <>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <div className="flex flex-col gap-4 w-full">
          <h1 className="headline-2">Accueil</h1>
          <p className="flex text-muted-foreground">
            Accéder aux différentes zones en cliquant sur le bouton
            correspondant
          </p>
          <div>
            {zones && (
              <div className="flex flex-col md:flex-row gap-2">
                {zones.map((zone) => (
                  <Button
                    key={zone.id}
                    asChild
                    variant="outline"
                    className="flex"
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
          <img src="/planMasse.png" width="100%" />
        </div>
      )}
    </>
  );
}

export default Home;
