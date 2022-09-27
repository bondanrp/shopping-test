import { Navigate, Route, Routes } from "react-router-dom";
import AuthRequired from "./helper/auth";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

export default function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/home" />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/register" element={<RegisterPage />} />
      <Route
        exact
        path="/home"
        element={
          <AuthRequired>
            <HomePage />
          </AuthRequired>
        }
      />
    </Routes>
  );
}
