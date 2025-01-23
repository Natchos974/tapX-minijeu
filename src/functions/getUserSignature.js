import { supabase } from "../utils/supabaseClient";

export default async function getUserSignature(userId, courseId) {
  const { data, error } = await supabase
    .from("user_signature")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .single();

  if (error) {
    return null;
  }
  return data;
}
