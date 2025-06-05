import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashBoard from "./pages/AdminDashBoard";
import ForgotPassword from "./components/ForgotPassword";
import UsersPage from "./pages/UsersPage";
import AuthWrapper from "./components/AuthWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthWrapper />, // Logic handled inside this
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/adminBoard",
    element: <AdminDashBoard />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/content",
    element: <UsersPage />,
  },
  {
    path: "*",
    element: <h1>Error Page Not Found</h1>,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
