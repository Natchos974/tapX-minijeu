import { Button } from "./ui/button";
import { useTransition, useState, useContext, useEffect } from "react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { SuccessContext } from "../utils/SuccessContext";

function NextChapterButton({
  courseId,
  //nextChapterId,
  //isLastChapter,
  currentChapterId,
  initialIsCompleted,
  userId,
  isCourseSigned,
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { success } = useContext(SuccessContext);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);

  useEffect(() => {
    setIsCompleted(initialIsCompleted);
  }, [initialIsCompleted]);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await supabase.from("user_progress").upsert({
        user_id: userId,
        chapter_id: currentChapterId,
        isCompleted: !isCompleted,
      });
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.log("erreur Next chapter button", error);
    } finally {
      navigate(`/courses/${courseId}`);
      window.location.reload();
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading || isCourseSigned || !success}
      variant={isCompleted ? "outline" : "success"}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Chargement...
        </>
      ) : (
        <>
          {isCourseSigned
            ? "Le cours a déjà été signé, vous ne pouvez plus modifier le statut du cours"
            : isCompleted
            ? "Ce cours a déjà été validé !"
            : "Cliquez pour valider ce cours"}
          <Icon className="h-4 w-4 ml-2" />
        </>
      )}
    </Button>
  );
}

export default NextChapterButton;
