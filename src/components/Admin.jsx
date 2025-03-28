import { useSession } from "../utils/useSession";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import Form from "./Form";

function Admin() {
  const navigate = useNavigate();
  const session = useSession();

  useEffect(() => {
    if (session) {
      const jwt = jwtDecode(session.access_token);
      const isAdmin = jwt.user_role === "admin";
      if (!isAdmin) {
        navigate("/");
      }
    }
  }, [session, navigate]);

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="headline-2">Dashboard administrateur</h1>
      <p className="text-muted-foreground">
        Cette page n&apos;est accessible qu aux admins, on peut y insérer toutes
        les fonctionnalités que l&apos;on souhaite (ajout d&apos;utilisateur,
        ajout de zones, validation des zones, ajout de mobilier, de
        documents....)
      </p>
      <Form />
    </div>
  );
}

export default Admin;
