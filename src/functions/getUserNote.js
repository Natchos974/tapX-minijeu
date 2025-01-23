import { supabase } from "../utils/supabaseClient";

export default async function getUserNote(userId, courseId) {
  const { data, error } = await supabase
    .from("user_notes")
    .select("hasValidatedPracticalExam, is_noted")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .single();

  if (error) {
    return null;
  }
  return data;
}
