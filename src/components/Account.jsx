import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Avatar from "./Avatar";
import propTypes from "prop-types";
import { ArrowBigRightDash } from "lucide-react";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      website,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

  return (
    <>
      <form
        onSubmit={updateProfile}
        className="flex flex-col gap-4 w-full max-w-[500px]"
      >
        <div className="flex flex-col gap-2 justify-center">
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={session.user.email}
            disabled
            className="input-field"
          />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <label className="font-semibold" htmlFor="username">
            Name
          </label>
          <input
            id="username"
            className="input-field"
            type="text"
            required
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <label className="font-semibold" htmlFor="website">
            Website
          </label>
          <input
            id="website"
            type="url"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
            className="input-field"
          />
        </div>
        <Avatar
          url={avatar_url}
          onUpload={(event, url) => {
            updateProfile(event, url);
          }}
        />
        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center border w-[200px] gap-2 font-semibold text-l hover:bg-zinc-100 h-11 hover:text-zinc-700 px-2 md:px-8 py-3 rounded-md"
          >
            <ArrowBigRightDash />
            {loading ? <span>Loading...</span> : <span>Update </span>}
          </button>
        </div>
      </form>
    </>
  );
}

Account.propTypes = {
  session: propTypes.object.isRequired,
};
