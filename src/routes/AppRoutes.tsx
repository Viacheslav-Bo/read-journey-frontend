import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        {/* <Route path="/recommended" element={<RecommendedPage />} /> */}
        {/* <Route path="/library" element={<LibraryPage />} /> */}
        {/* <Route path="/reading/:bookId" element={<ReadingPage />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
