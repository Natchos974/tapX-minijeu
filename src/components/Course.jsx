import { useParams } from "react-router-dom";
import { SkeletonCard } from "./SkeletonCard";
import ChapterCard from "./ChapterCard";
import SignatureItem from "./SignatureItem";

function Course({ courses, isLoading }) {
  const { id } = useParams();
  const courseId = Number(id); // Convertir l'ID en nombre entier
  // Filtrer l'objet pour récupérer l'item correspondant
  const course = courses?.find((course) => course.id === courseId);
  const chapterArray = course?.chapterArray;
  const signatureIsAvailable = course?.chapterArray?.every(
    (chapter) => chapter.isCompleted
  );
  if (!chapterArray) return <SkeletonCard />;
  if (chapterArray?.length === 0) return <p>Il n y a pas de chapitres</p>;

  return (
    <>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {chapterArray.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              id={chapter.id}
              title={chapter.description}
              isCompleted={chapter.isCompleted}
            />
          ))}
          <SignatureItem
            key={course.id}
            courseId={course.id}
            isAvailable={signatureIsAvailable}
            isSigned={false}
          />
        </div>
      )}
    </>
  );
}

export default Course;
