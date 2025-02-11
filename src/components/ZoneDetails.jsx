import { Link, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useData } from "../utils/useData";

function ZoneDetails() {
  const { id } = useParams();
  const { datas } = useData();
  const zones = datas?.zones;
  const zone = zones?.find((zone) => zone.id == id);

  return (
    <div className="flex flex-col gap-2">
      <Button asChild variant="outline" className="flex w-fit">
        <Link to="/zone">
          <ArrowLeft />
          Retour listing zones
        </Link>
      </Button>
      <h1 className="headline-2">Voici le détail de la zone {zone?.name}</h1>
      <p className="text-muted-foreground">
        Insérer ici les éléments de détails de la zone (visuels, rendus 3d,
        listing du mobilier...){" "}
      </p>
      <div className="w-full md:aspect-video overflow-hidden">
        <img
          src={zone?.main_picture}
          alt={zone?.name}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}

export default ZoneDetails;
