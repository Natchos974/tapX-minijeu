import { useContext, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { SuccessContext } from "../utils/SuccessContext";

function PlayerH5p({ h5pJsonPath }) {
  const h5pContainer = useRef(null);
  const { setSuccess } = useContext(SuccessContext);
  const { toast } = useToast();
  useEffect(() => {
    const h5pFunc = async (el, options) => {
      try {
        const { H5P: H5PStandalone } = await import("h5p-standalone");
        await new H5PStandalone(el, options);
        window.H5P.externalDispatcher.on("xAPI", (event) => {
          const eventIsSuccess = event.data?.statement?.result?.success;
          const eventIsCompleted =
            event.data?.statement?.verb?.id ===
            "http://adlnet.gov/expapi/verbs/completed";
          const scoreEvent = event.data?.statement?.result?.score?.scaled;
          if (eventIsCompleted) {
            if (eventIsSuccess || scoreEvent == 1) {
              console.log("Vous avez réussi");
              toast({
                variant: "success",
                description:
                  "Vous avez réussi le test, cliquez sur le bouton en bas du cours pour le valider",
              });
              setSuccess(true);
            } else {
              toast({
                variant: "destructive",
                description:
                  "Vous n'avez pas atteint le score suffisant, essayez encore pour pouvoir valider le cours !",
              });
            }
          }
        });
      } catch (error) {
        console.log("Error H5P: ", error);
      }
    };
    setSuccess(false);
    if (h5pContainer.current) {
      const el = h5pContainer.current;
      const existingInstance = el.querySelector(".h5p-iframe-wrapper");
      if (existingInstance) {
        // Remove the existing instance
        el.removeChild(existingInstance);
        console.log("I went here");
      }
      const options = {
        h5pJsonPath,
        frameJs: "/assets/frame.bundle.js",
        frameCss: "/assets/h5p.css",
      };
      h5pFunc(el, options);
    }
  }, [setSuccess, h5pJsonPath, toast]);

  return (
    <>
      <div id="h5p-container" ref={h5pContainer}></div>
    </>
  );
}

export default PlayerH5p;
