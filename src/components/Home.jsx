import CourseCard from "./CourseCard";
import { SkeletonCard } from "./SkeletonCard";

function Home({ courses, isLoading }) {
  const myCourses = courses.filter((item) => item.progress > 0);

  return (
    <>
      {isLoading ? (
        <SkeletonCard />
      ) : myCourses.length === 0 ? (
        <p className="text-muted-foreground">
          Vous ne suivez aucun cours pour le moment
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
          {myCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              image={course.imageURL}
              chapters={course.chapters}
              progress={course.progress}
              note={course.note}
              signature={course.signature}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
