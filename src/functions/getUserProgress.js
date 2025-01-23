import { supabase } from "../utils/supabaseClient";

export default async function getUserProgress(courseId, userId) {
  try {
    const { data: Chapters } = await supabase
      .from("chapters")
      .select("id")
      .eq("courseId", courseId);

    let listOfChaptersId = [];
    if (Array.isArray(Chapters) && Chapters.length > 0) {
      listOfChaptersId = Chapters.map((chapter) => Number(chapter.id));
    }

    const { data: userProgress } = await supabase
      .from("user_progress")
      .select("*")
      .in("chapter_id", listOfChaptersId)
      .eq("isCompleted", true)
      .eq("user_id", userId);

    const numberOfChapters = Number(listOfChaptersId.length);
    let progressPercentage = 0;
    if (
      numberOfChapters === 0 ||
      userProgress?.length === 0 ||
      userProgress === null
    ) {
      progressPercentage = 0;
    } else {
      progressPercentage = Math.round(
        (Number(userProgress.length) / Number(numberOfChapters)) * 100
      );
    }
    return progressPercentage;
  } catch (error) {
    console.log("Get User progress error", error);
    return 0;
  }
}
