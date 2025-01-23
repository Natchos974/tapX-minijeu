import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import getUserProgress from "../functions/getUserProgress";
import getChapters from "../functions/getChapters";
import { useSession } from "../utils/useSession";

const InitialLoader = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    async function fetchCourses(userId) {
      try {
        const { data: courses } = await supabase.from("courses").select("*");
        const coursesWithProgress = await Promise.all(
          courses?.map(async (course) => {
            const userProgress = await getUserProgress(course.id, userId);
            const chapters = await getChapters(course.id, userId);
            //const note = await getUserNote(userId, course.id);
            //const isNoted = note ? note.is_noted : false;
            //const signature = await getUserSignature(userId, course.id);
            return {
              ...course,
              progress: userProgress,
              chapters: chapters?.length,
              chapterArray: chapters,
              //note: isNoted,
              //signature: signature?.is_signed,
            };
          })
        );
        return coursesWithProgress;
      } catch (error) {
        console.log("Get Courses with progress error", error);
        return [];
      }
    }

    if (session) {
      // Appel à l'API pour récupérer les cours de l'utilisateur
      fetchCourses(session.user.id)
        .then((data) => {
          setCourses(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch courses:", error);
          setIsLoading(false);
        });
    }
  }, []);

  if (!courses) {
    return <div>Loading...</div>; // Afficher un indicateur de chargement
  }

  return children({ courses, isLoading });
};

export default InitialLoader;
