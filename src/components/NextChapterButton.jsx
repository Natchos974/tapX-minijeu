import { Button } from "./ui/button";
import { useState, useContext, useEffect } from "react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SuccessContext } from "../utils/SuccessContext";

function NextChapterButton({
  courseId,
  currentChapterId,
  initialIsCompleted,
  isCourseSigned,
  updateChapterStatus,
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { success } = useContext(SuccessContext);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);

  useEffect(() => {
    setIsCompleted(initialIsCompleted);
  }, [initialIsCompleted]);

  /* const onClick = async () => {
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
  };*/
  const handleChapterCompletion = async () => {
    const success = await updateChapterStatus(
      courseId,
      currentChapterId,
      !isCompleted
    );
    console.log(success);
    if (!success) {
      // Si l'appel API échoue, afficher un message d'erreur ou restaurer l'état
      console.log("La validation du chapitre a échoué");
    }
    navigate(`/courses/${courseId}`);
  };

  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <Button
      onClick={handleChapterCompletion}
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
