import { useState, useEffect, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { refresh } from "./api/auth/refresh";
import { me } from "./api/auth/me";
import { useAuthStore } from "./store/authStore";

const App = () => {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { setAuth, clearAuth, setAccessToken } = useAuthStore();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const restoreSession = async () => {
      try {
        const { data } = await refresh();
        setAccessToken(data.accessToken);
        const meResponse = await me();
        setAuth(data.accessToken, meResponse.user);
      } catch {
        clearAuth();
      } finally {
        setIsAuthLoading(false);
      }
    };

    restoreSession();
  }, [setAuth, clearAuth, setAccessToken]);

  if (isAuthLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
