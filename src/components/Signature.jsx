import { useSession } from "../utils/useSession";
import { useNavigate, useParams } from "react-router-dom";
import PadSignature from "./PadSignature";
import DownloadCertificateButton from "./DownloadCertificateButton";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

function Signature({ courses, handleSignatureStatus }) {
  const session = useSession();
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = Number(id); // Convertir l'ID en nombre entier
  const [username, setUsername] = useState(null);

  const [lastname, setLastname] = useState(null);

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

  useEffect(() => {
    async function getProfile() {
      const { user } = session;
      const { data } = await supabase
        .from("profiles")
        .select(`username, lastname`)
        .eq("id", user.id)
        .single();
      setUsername(data.username);
      setLastname(data.lastname);
    }
    getProfile();
  }, [session]);
  console.log(username, lastname);
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
            userFirstName={username}
            userLastName={lastname}
            userId={session?.user?.id}
            handleSignatureStatus={handleSignatureStatus}
          />
        </>
      )}
    </div>
  );
}

export default Signature;
