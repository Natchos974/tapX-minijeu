import { supabase } from "../utils/supabaseClient";

export default async function getChapters(courseId, userId) {
  try {
    // Récupérer les chapitres du cours
    const { data: chapters } = await supabase
      .from("chapters")
      .select("*")
      .eq("courseId", courseId)
      .order("order_inside_course", { ascending: true });

    // Récupérer les données de progression de l'utilisateur pour les chapitres du cours
    const { data: userProgress } = await supabase
      .from("user_progress")
      .select("chapter_id, isCompleted")
      .eq("user_id", userId)
      .in(
        "chapter_id",
        chapters.map((chapter) => chapter.id)
      );

    // Mettre à jour les chapitres avec la valeur de isCompleted
    const updatedChapters = chapters?.map((chapter) => {
      const progress = userProgress?.find(
        (progress) => progress.chapter_id === chapter.id
      );
      return {
        ...chapter,
        isCompleted: progress ? progress.isCompleted : false,
      };
    });
    return updatedChapters;
  } catch (error) {
    console.log("get chapter error", error);
    return [];
  }
}
