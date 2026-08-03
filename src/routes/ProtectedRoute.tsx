import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Header from "../components/Header/Header";

const ProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
