import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";

export default function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/home" />} />
      <Route exact path="/login" element={<LoginPage />} />
    </Routes>
  );
}
