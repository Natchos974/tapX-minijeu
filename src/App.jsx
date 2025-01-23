import Auth from "./components/Auth";
import Search from "./components/Search";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Account from "./components/Account";
import Course from "./components/Course";
import { useSession } from "./utils/useSession";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./components/Home";
import InitialLoader from "./components/InitialLoader";
import CourseLayout from "./components/CourseLayout";
import Chapter from "./components/Chapter";
import ChapterLayout from "./components/ChapterLayout";
import Admin from "./components/Admin";

function App() {
  const session = useSession();
  if (!session) return <Auth />;
  return (
    <Router>
      <InitialLoader>
        {({ courses, isLoading }) => (
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route
                path="/"
                element={<Home courses={courses} isLoading={isLoading} />}
              />
              <Route
                path="/account"
                element={<Account key={session?.user.id} session={session} />}
              />
              <Route
                path="/search"
                element={<Search courses={courses} isLoading={isLoading} />}
              />
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route element={<CourseLayout />}>
              <Route
                path="/courses/:id"
                element={<Course courses={courses} />}
              />{" "}
              <Route
                path="/courses/:id/chapters/:chapterId"
                element={<Chapter courses={courses} />}
              />
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
