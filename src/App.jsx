import Auth from "./components/Auth";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Account from "./components/Account";
import { useSession } from "./utils/useSession";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./components/Home";
import { DataProvider } from "./utils/DataProvider";
import NfcCard from "./components/NfcCard";
import NFCRedirectPage from "./components/NFCRedirectPage";
import PairCardPage from "./components/PairCardPage";
import MiniJeu from "./components/MiniJeu";
import SpinningWheel from "./components/SpinningWheel";
import ScrollTop from "./components/ScrollTop";

function App() {
  const session = useSession();

  return (
    <Router>
      <ScrollTop />
      <DataProvider userId={session?.user?.id}>
        <Routes>
          {/* Public Routes */}
          <Route path="/config/:card_id" element={<NFCRedirectPage />} />
          <Route path="/wheel/:merchant_id" element={<SpinningWheel />} />
          {/* Private Routes */}
          {session ? (
            <>
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Home />} />
                <Route
                  path="/account"
                  element={<Account key={session?.user.id} session={session} />}
                />
                <Route
                  path="/mes-cartes"
                  element={<NfcCard key={session?.user.id} />}
                />
                <Route
                  path="/pair-card/:card_id"
                  element={<PairCardPage />}
                  session={session}
                />
                <Route path="/mini-jeu" element={<MiniJeu />} />
              </Route>
            </>
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
