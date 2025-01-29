import { Button } from "./ui/button";
import { useState, useContext, useEffect } from "react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SuccessContext } from "../utils/SuccessContext";
import { useToast } from "@/hooks/use-toast";

function NextChapterButton({
  courseId,
  currentChapterId,
  initialIsCompleted,
  isCourseSigned,
  updateChapterStatus,
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  let { success } = useContext(SuccessContext);
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted);
  success = true; // Remove this line to avoid validating chapter that are not yet validated by the user
  useEffect(() => {
    setIsCompleted(initialIsCompleted);
  }, [initialIsCompleted]);
  const { toast } = useToast();
  const handleChapterCompletion = async () => {
    setIsLoading(true);
    const successOptimistic = await updateChapterStatus(
      courseId,
      currentChapterId,
      !isCompleted
    );

    console.log("Success ? :", successOptimistic);
    navigate(`/courses/${courseId}`);
    if (!successOptimistic) {
      // Si l'appel API échoue, afficher un message d'erreur ou restaurer l'état
      console.log("La validation du chapitre a échoué");
      toast({
        title: "Echec !",
        description: "La validation du chapitre a échouée",
        variant: "destructive",
      });
    }

    setIsLoading(false);
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
