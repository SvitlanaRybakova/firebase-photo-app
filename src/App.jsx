import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthContext } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import ResetPasswordPage from "./pages/ResetPassword";
import AlbumPage from "./pages/AlbumPage";

function App() {
  const { currentUser } = useAuthContext();
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        {/* todo Public !*/}
        <Route path={`/${currentUser.uid}/:title`} element={<AlbumPage />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </div>
  );
}

export default App;
