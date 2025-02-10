import { useData } from "../utils/useData";
import CourseCard from "./CourseCard";
import { SkeletonCard } from "./SkeletonCard";

function Zone() {
  const { datas, isLoading } = useData();
  const zones = datas?.zones;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="headline-2">Détails des différentes zones du projet </h1>
      <p className="text-muted-foreground">
        Les zones avec un tag vert sont celles déjà validées{" "}
      </p>
      {isLoading ? (
        <SkeletonCard />
      ) : zones?.length === 0 ? (
        <p className="text-muted-foreground">
          Aucune zone n&apos;a été ajoutée au projet pour le moment...
        </p>
      ) : (
        <div className="grid w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
          {zones &&
            zones.map((item) => (
              <CourseCard
                key={item.id}
                id={item.id}
                title={item.name}
                image={item.main_picture}
                isValidated={item.is_validated}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default Zone;
