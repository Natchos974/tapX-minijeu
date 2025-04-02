import Auth from "./components/Auth";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Account from "./components/Account";
import { useSession } from "./utils/useSession";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Drone from "./components/Drone";
import Interieur from "./components/Interieur";
import Viewer3d from "./components/Viewer3d";
import Zone from "./components/Zone";
import ZoneDetails from "./components/ZoneDetails";
import { DataProvider } from "./utils/DataProvider";
import CheckURL from "./components/CheckURL";

function App() {
  const session = useSession();

  return (
    <Router>
      <DataProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/config/:id" element={<CheckURL />} />

          {/* Private Routes */}
          {session ? (
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/account"
                element={<Account key={session?.user.id} session={session} />}
              />
              <Route path="/admin" element={<Admin />} />
              <Route path="/zone" element={<Zone />} />
              <Route path="/zone/:id" element={<ZoneDetails />} />
              <Route path="/vue-drone" element={<Drone />} />
              <Route path="/vue-interieure" element={<Interieur />} />
              <Route path="/3d-view" element={<Viewer3d />} />
            </Route>
          ) : (
            <Route path="*" element={<Auth />} />
          )}

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <p className="flex font-semibold text-3xl h-full w-full justify-center mt-5">
                Oops...there is nothing here: 404!
              </p>
            }
          />
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;
