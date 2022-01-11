import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthContext } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import RequireAuth from "./components/RequireAuth";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import ResetPasswordPage from "./pages/ResetPassword";
import AlbumPage from "./pages/AlbumPage";
import PageNotFound from "./pages/PageNotFound";
import { findUserId } from "./servises/user";

function App() {
  const { currentUser } = useAuthContext();

  return (
    <div className="App">
      <Navigation />
      <Routes>
        {/* Public routes */}
        <Route
          path={`/${currentUser ? currentUser.uid : findUserId()}/:title`}
          element={<AlbumPage />}
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<PageNotFound />} />

        {/* Private Public !*/}
        <Route
          path="/"
          element={
            <RequireAuth redirectTo="/login">
              <HomePage />
            </RequireAuth>
          }
        />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </div>
  );
}

export default App;
