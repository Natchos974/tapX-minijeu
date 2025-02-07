import CourseCard from "./CourseCard";
import { SkeletonCard } from "./SkeletonCard";

function Zone({ isLoading }) {
  const zone = [
    {
      label: "Terrasse 1",
      id: 1,
      isValidated: true,
      src: "/placeholder.png",
    },
    {
      label: "Terrasse 2",
      id: 2,
      isValidated: false,
      src: "/placeholder.png",
    },
  ];

  return (
    <>
      <h1 className="headline-2">Détails des différentes zones du projet : </h1>
      {isLoading ? (
        <SkeletonCard />
      ) : zone.length === 0 ? (
        <p className="text-muted-foreground">
          Aucune zone n&apos;a été ajoutée au projet pour le moment...
        </p>
      ) : (
        <div className="grid w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
          {zone.map((item) => (
            <CourseCard
              key={item.id}
              id={item.id}
              title={item.label}
              image={item.src}
              isValidated={item.isValidated}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Zone;
