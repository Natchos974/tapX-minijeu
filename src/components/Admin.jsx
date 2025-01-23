import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { Button } from "./ui/button";

function Admin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      const { data, error } = await supabase.from("classe").select("id, name");
      if (error) {
        console.error("Error fetching classes:", error);
      } else {
        setClasses(data);
      }
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch("http://localhost:3000/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password, classeId: selectedClassId }),
      });
      console.log(
        JSON.stringify({ login, password, classeId: selectedClassId })
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      console.log(data);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-md bg-slate-200 px-3 py-5 w-full md:w-fit">
      <h1 className="text-lg font-bold">Create User</h1>
      {success && (
        <p className="text-muted-foreground">User created successfully!</p>
      )}
      {error && <p className="text-muted-foreground">Error: {error}</p>}
      <form id="frm" onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 justify-center">
          <label className="font-semibold">Login</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            className="rounded-md px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <label className="font-semibold">Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-md px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-1 justify-center">
          <label className="font-semibold">Class</label>
          <select
            value={selectedClassId}
            onChange={(e) => {
              setSelectedClassId(e.target.value);
            }}
            required
            className="rounded-md px-2 py-1"
          >
            <option value="" disabled>
              Select a class
            </option>
            {classes.map((classe) => (
              <option key={classe.id} value={classe.id}>
                {classe.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </Button>
      </form>
    </div>
  );
}

export default Admin;
