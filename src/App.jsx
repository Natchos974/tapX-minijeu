import Auth from "./components/Auth";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Account from "./components/Account";
import { useSession } from "./utils/useSession";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./components/Home";
import InitialLoader from "./components/InitialLoader";
import Admin from "./components/Admin";
import Drone from "./components/Drone";
import Interieur from "./components/Interieur";
import Viewer3d from "./components/Viewer3d";
import Zone from "./components/Zone";

function App() {
  const session = useSession();
  if (!session) return <Auth />;
  return (
    <Router>
      <InitialLoader>
        {({ datas, isLoading }) => (
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route
                path="/"
                element={<Home data={datas} isLoading={isLoading} />}
              />
              <Route
                path="/account"
                element={<Account key={session?.user.id} session={session} />}
              />
              <Route path="/admin" element={<Admin />} />
              <Route path="/zone" element={<Zone />} />
              <Route path="/zone/:id" element={<p>Zone placeholder</p>} />
              <Route path="/vue-drone" element={<Drone />} />
              <Route path="/vue-interieure" element={<Interieur />} />
              <Route path="/3d-view" element={<Viewer3d />} />
            </Route>
            <Route
              path="*"
              element={
                <p className=" flex font-semibold text-3xl h-full w-full justify-center mt-5">
                  Oops...there is nothing here: 404!
                </p>
              }
            />
          </Routes>
        )}
      </InitialLoader>
    </Router>
  );
}

export default App;
