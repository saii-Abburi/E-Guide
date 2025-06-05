import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AdminDashBoard from "../pages/AdminDashBoard";
import UsersPage from "../pages/UsersPage";
import MainPage from "../pages/MainPage";

const AuthWrapper = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const tokenResult = await currentUser.getIdTokenResult();
        const role = tokenResult.claims.role || "user";
        setUser({ ...currentUser, role });

        // After login, redirect from /login to respective dashboard
        if (location.pathname === "/login") {
          if (role === "admin") {
            navigate("/adminBoard", { replace: true });
          } else {
            navigate("/content", { replace: true });
          }
        }
      } else {
        setUser(null);

        // Only redirect if not already on login or home
        if (!["/", "/login"].includes(location.pathname)) {
          navigate("/", { replace: true });

          // Force reload to ensure pathname updates in all tabs
          setTimeout(() => {
            window.location.href = "/";
          }, 10);
        }
      }
      setLoading(false);
    });

    const handleStorageChange = (event) => {
      if (event.key === "logout") {
        setUser(null);
        navigate("/", { replace: true });

        // Force URL update in current tab too
        setTimeout(() => {
          window.location.href = "/";
        }, 10);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      unsubscribe();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [location, navigate]);

  if (loading) {
    return (
      <p className="text-white bg-black text-center w-full h-screen text-heading font-semibold">
        Loading...
      </p>
    );
  }

  return user?.role === "admin" ? (
    <AdminDashBoard />
  ) : user ? (
    <UsersPage />
  ) : (
    <MainPage />
  );
};

// 🔐 Logout function used anywhere in app
export const logout = async () => {
  await signOut(auth);
  localStorage.setItem("logout", Date.now());
  window.location.href = "/"; 
};

export default AuthWrapper;
