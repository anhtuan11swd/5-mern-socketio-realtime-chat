import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
          path="/"
        />
        <Route
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
          path="/signup"
        />
        <Route
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          path="/login"
        />
        <Route
          element={authUser ? <SettingsPage /> : <Navigate to="/login" />}
          path="/settings"
        />
        <Route
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          path="/profile"
        />
      </Routes>

      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </div>
  );
}

export default App;
