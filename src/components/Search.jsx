import CourseCard from "./CourseCard";
import { SkeletonCard } from "./SkeletonCard";

function Search({ courses, isLoading }) {
  const allCourses = courses.filter((item) => item.progress === 0);
  return (
    <>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4">
          {allCourses?.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              image={course.imageURL}
              chapters={course.chapters}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Search;
