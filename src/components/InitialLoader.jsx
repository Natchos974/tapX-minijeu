import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import getUserProgress from "../functions/getUserProgress";
import getChapters from "../functions/getChapters";
import { useSession } from "../utils/useSession";
import getUserSignature from "../functions/getUserSignature";

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
            const signature = await getUserSignature(userId, course.id);
            return {
              ...course,
              progress: userProgress,
              chapters: chapters?.length,
              chapterArray: chapters,
              //note: isNoted,
              signature: signature ? signature.is_signed : false,
              certificate_url: signature ? signature.certificate_url : null,
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

  const updateChapterStatus = async (courseId, chapterId, isCompleted) => {
    let initialChapter = null;
    let initialProgress = null;
    try {
      // Mise à jour optimiste dans le state local
      const updatedCourses = [...courses];
      console.log(updatedCourses);
      const courseIndex = updatedCourses.findIndex(
        (course) => course.id === Number(courseId)
      );

      const chapterIndex = updatedCourses[courseIndex]?.chapterArray?.findIndex(
        (chapter) => chapter.id === Number(chapterId)
      );

      if (chapterIndex === -1) return false; // Si le chapitre n'est pas trouvé, on quitte

      // Sauvegarder l'état initial du chapitre et du progres pour pouvoir revenir en arrière si nécessaire
      initialChapter = {
        ...updatedCourses[courseIndex].chapterArray[chapterIndex],
      };
      console.log(initialChapter);
      initialProgress = updatedCourses[courseIndex].progress;
      console.log(initialProgress);
      // Mise à jour optimiste : le chapitre est marqué comme validé ou non validé
      updatedCourses[courseIndex].chapterArray[chapterIndex] = {
        ...updatedCourses[courseIndex].chapterArray[chapterIndex],
        isCompleted, // Utilisation de isCompleted passé en argument
      };

      setCourses(updatedCourses); // Mise à jour du state local

      // Appel à l'API pour persister la validation dans la base de données
      const { error } = await supabase.from("user_progress").upsert({
        user_id: session.user.id,
        chapter_id: chapterId,
        isCompleted: isCompleted,
      });

      if (error) {
        throw new Error(error.message);
      } // Si l'API échoue, on lance une erreur
      // Recalculer la progression de l'utilisateur après la mise à jour
      const userProgress = await getUserProgress(courseId, session.user.id);
      // Mettre à jour la progression de l'utilisateur dans le state local
      updatedCourses[courseIndex].progress = userProgress;
      setCourses(updatedCourses); // Mise à jour du state local avec la nouvelle progression

      return true; // Si la mise à jour réussit
    } catch (error) {
      console.error("Erreur API:", error);

      // Rétablir l'état si l'API échoue
      const updatedCourses = [...courses];
      console.log(updatedCourses);
      const courseIndex = updatedCourses.findIndex(
        (course) => course.id === Number(courseId)
      );
      const chapterIndex = updatedCourses[courseIndex]?.chapterArray?.findIndex(
        (chapter) => chapter.id === Number(chapterId)
      );

      if (chapterIndex !== -1 && initialChapter) {
        // Restaurer l'état initial du chapitre
        updatedCourses[courseIndex].chapterArray[chapterIndex] = initialChapter;
        // Restaurer l'état initial de la progression
        updatedCourses[courseIndex].progress = initialProgress;
        setCourses(updatedCourses); // Réinitialiser l'état local
        console.log("updated courses when fail", updatedCourses);
      }

      return false; // Indiquer que la mise à jour a échoué
    }
  };
  const handleSignatureStatus = async (courseId, userId, certificateUrl) => {
    let initialSignature = null;
    let initialCertificateUrl = null;
    try {
      const updatedCourses = [...courses];
      const courseIndex = updatedCourses.findIndex(
        (course) => course.id === Number(courseId)
      );

      if (courseIndex === -1) return false;

      initialSignature = updatedCourses[courseIndex].signature;
      initialCertificateUrl = updatedCourses[courseIndex].certificate_url;

      updatedCourses[courseIndex].signature = true;
      updatedCourses[courseIndex].certificate_url = certificateUrl;

      setCourses(updatedCourses);

      const { error } = await supabase.from("user_signature").upsert({
        user_id: userId,
        course_id: courseId,
        is_signed: true,
        certificate_url: certificateUrl,
      });

      if (error) throw new Error(error.message);

      return true;
    } catch (error) {
      console.error("Erreur API:", error);

      const updatedCourses = [...courses];
      const courseIndex = updatedCourses.findIndex(
        (course) => course.id === Number(courseId)
      );

      if (courseIndex !== -1) {
        updatedCourses[courseIndex].signature = initialSignature;
        updatedCourses[courseIndex].certificate_url = initialCertificateUrl;
        setCourses(updatedCourses);
      }

      return false;
    }
  };
  if (!courses) {
    return <div>Loading...</div>; // Afficher un indicateur de chargement
  }

  return children({
    courses,
    isLoading,
    updateChapterStatus,
    handleSignatureStatus,
  });
};

export default InitialLoader;
