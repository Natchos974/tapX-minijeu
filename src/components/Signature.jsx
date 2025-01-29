import { useSession } from "../utils/useSession";
import { useNavigate, useParams } from "react-router-dom";
import PadSignature from "./PadSignature";
import DownloadCertificateButton from "./DownloadCertificateButton";
import { useEffect } from "react";

function Signature({ courses, handleSignatureStatus }) {
  const session = useSession();
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = Number(id); // Convertir l'ID en nombre entier

  // Filtrer l'objet pour récupérer l'item correspondant
  const course = courses?.find((course) => course.id === courseId);
  const signatureIsAvailable = course?.chapterArray?.every(
    (chapter) => chapter.isCompleted
  );
  useEffect(() => {
    if (!signatureIsAvailable) {
      navigate("/");
    }
  }, [signatureIsAvailable, navigate]);

  if (!signatureIsAvailable) {
    return null; // Return null or a loading spinner while navigating
  }

  const isSigned = course.signature;
  const certificateUrl = course?.certificate_url;
  return (
    <div className=" flex flex-col p-5 gap-5">
      {isSigned ? (
        <>
          <h1 className="text-lg font-bold">Vous avez déjà signé ce cours</h1>
          <DownloadCertificateButton certificateUrl={certificateUrl} />
        </>
      ) : (
        <>
          <h1 className="text-lg font-bold">Signature élève</h1>
          <p>
            Bravo vous avez validé tous les cours ! Signez ici pour finaliser le
            cours et obtenir votre attestation
          </p>
          <PadSignature
            courseName={course.title}
            courseId={courseId}
            userFirstName={"firstName"}
            userLastName={"lastName"}
            userId={session?.user?.id}
            //setCertificateGenerated={setCertificateGenerated}
            //setCertificateUrl={setCertificateUrl}
            handleSignatureStatus={handleSignatureStatus}
            //certificateUrl={certificateUrl}
          />
        </>
      )}
    </div>
  );
}

export default Signature;
