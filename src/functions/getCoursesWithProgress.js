import getUserProgress from "./getUserProgress";
import getChapters from "./getChapters";
import getUserNote from "./getUserNote";
import getUserSignature from "./getUserSignature";
import { supabase } from "../utils/supabaseClient";

export default async function getCoursesWithProgress(userId) {
  try {
    console.log("supabase", supabase);
    const { data: courses } = await supabase.from("courses").select("*");
    console.log("course", courses);
    const coursesWithProgress = await Promise.all(
      courses?.map(async (course) => {
        const userProgress = await getUserProgress(course.id, userId);
        const chapters = await getChapters(course.id);
        const note = await getUserNote(userId, course.id);
        const isNoted = note ? note.is_noted : false;
        const signature = await getUserSignature(userId, course.id);
        return {
          ...course,
          progress: userProgress,
          chapters: chapters?.length,
          note: isNoted,
          signature: signature?.is_signed,
        };
      })
    );
    return coursesWithProgress;
  } catch (error) {
    console.log("Get Courses with progress error", error);
    return [];
  }
}
