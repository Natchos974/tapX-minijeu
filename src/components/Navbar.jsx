//import { useEffect, useState } from "react";
//import { supabase } from "../utils/supabaseClient";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

function Navbar() {
  //const session = useSession();
  //const { user } = session;
  //const [png, setPng] = useState(null);
  //const [username, setUsername] = useState(null);
  //const [avatarUrl, setAvatarUrl] = useState(null);
  /*useEffect(() => {
    async function getPng() {
      const { data } = await supabase
        .from("profiles")
        .select(`avatar_url, username`)
        .eq("id", user.id)
        .single();
      //setPng(data.avatar_url);
      setUsername(data.username);
    }
    getPng();
  }, [user.id]);*/

  /*useEffect(() => {
    function getProfilePictureUrl(url) {
      const { data } = supabase.storage.from("avatars").getPublicUrl(url);

      setAvatarUrl(data.publicUrl);
    }

    getProfilePictureUrl(png);
  }, [png]);
*/
  /*
  return (
    <div className="p-4 z-50 border-b h-full font-semibold flex gap-5 bg-white shadow-sm justify-between md:justify-end items-center">
      <MobileMenu className="justify-start" />
      {username && (
        <p className="invisible md:visible text-muted-foreground">{username}</p>
      )}
      <div className="relative">
        <Link to="/account">
          <img
            src="avatar.png"
            alt="Avatar"
            className="rounded-full border-[3px] border-emerald-400 object-contain"
            style={{ width: "50px", height: "50px" }}
          />
        </Link>

        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 transform translate-x-[-20%] translate-y-[-90%]">
          <span className="inset-0 absolute rounded-full bg-emerald-400 animate-ping"></span>
        </span>
      </div>
    </div>
  );*/
  return (
    <div className="p-4 z-50 border-b h-full font-semibold flex gap-5 bg-white shadow-sm justify-between md:justify-end items-center">
      <MobileMenu className="justify-start" />
      <div className="relative">
        <Link to="/account">
          <img
            src="avatar.png"
            alt="Avatar"
            className="rounded-full border-[3px] border-emerald-400 object-contain"
            style={{ width: "50px", height: "50px" }}
          />
        </Link>
        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 transform translate-x-[-20%] translate-y-[-90%]">
          <span className="inset-0 absolute rounded-full bg-emerald-400 animate-ping"></span>
        </span>
      </div>
    </div>
  );
}

export default Navbar;
