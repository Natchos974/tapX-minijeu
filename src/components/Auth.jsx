import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { ArrowBigRightDash } from "lucide-react";
//import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Login succeeded !");
      //navigate("/");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center h-screen items-center px-2">
      <div className="flex flex-col gap-6 border p-7 rounded-md">
        <h1 className="text-lg md:text-3xl font-bold">
          This is a template to create a Supabase + React app
        </h1>
        <p className="md:text-lg font-medium ">Sign in to access the app</p>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <input
              className="input-field"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input-field"
              type="password"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex border max-w-[200px] items-center gap-2 font-semibold text-l hover:bg-zinc-100 h-11 hover:text-zinc-700 px-2 md:px-8 py-3 rounded-md"
          >
            <ArrowBigRightDash />
            {loading ? <span>Loading</span> : <span>Sign in </span>}
          </button>
        </form>
      </div>
    </div>
  );
}
